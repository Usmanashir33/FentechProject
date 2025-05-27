import os ,random,re
import requests
from decouple import config
from core.c_pegination import CustomPagination   

from authUser.serializers import UserSerializer
from notifications.serializers import NotificationSerializer
from notifications.models import Notification
from account.websocketandmail import signal_sender
from account.models import MoneyTransaction
from .serializers import MoneyTransactionSerializer
from rest_framework.views import APIView

from rest_framework import permissions

from rest_framework import status
from rest_framework.response import Response
from authUser.models import User

FLW_PUBLIC_KEY = config("FLW_PUBLIC_KEY")
FLW_SECRET_KEY = config("FLW_SECRET_KEY")
FLW_SECRET_HASH = config("FLW_SECRET_HASH")


def identify_field_type(input_value):
    email_regex = r'^[\w\.-]+@[\w\.-]+\.\w+$'  # Basic email pattern
    phone_regex = r'^\+?\d{10,15}$'  # Matches 10-15 digits, optional '+'
    username_regex = r'^[a-zA-Z0-9_]{3,30}$'  # Alphanumeric and underscores, 3-30 chars

    if re.match(email_regex, input_value):
        user = User.objects.get(email = input_value)
        return user

    elif re.match(phone_regex, input_value):
        user = User.objects.get(phone_number = input_value)
        return user

    elif re.match(username_regex, input_value):
        user = User.objects.get(username = input_value)
        return user
    else:
        return None

def createWithdrawalTrx(request,recipient='withdrawal-approval'):
    # send notification and update the user  via websocket
    user = request.user
    amount = request.data.get('amount')
    user_room = f"room{user.id}"
    # recipient_room = f"room{recipient.id}"
    user_data = UserSerializer(user).data
    
    # create trx 
    user_trx = MoneyTransaction.objects.create(
        user = user,
        amount = f"{amount}",
        net_charges = 0.00,
        status = 'pending',
        transaction_type = 'Withdraw',
        notes = request.data.get('note'),
        withdrawal_account_number =  request.data.get('account_number'),    
        withdrawal_account_name = request.data.get('account_name'),
        withdrawal_bank_name = request.data.get('bank_name'),
        withdrawal_bank_code = request.data.get('bank_code'),
        # receiver = recipient
    )
    user_trx.save()
    trx = MoneyTransactionSerializer(user_trx).data
    user_resp = {
        "trx":trx,
        "trx_type":'approval_request',
        "user":user_data
    }
    # send this to approver 
    approver_resp = {
        "type":"send_response",
        "signal_name" : 'approval_request',
        "trx":trx,
    }
    approver = User.objects.get(is_superuser = True)
    approver_room = f"room{approver.id}"
    signal_sender(approver_room,approver_resp) # send trx to approver
    return user_resp
def createWithdrawalStatusChangeTrx(approver,trx,reason,trx_status):
    # send notification and update the user  via websocket
    user = trx.user
    user_room = f"room{user.id}"
    user_data = UserSerializer(user).data
    # create trx 
    trx.status = trx_status
    trx.approver = approver
    trx.save()
    trx_data = MoneyTransactionSerializer(trx).data
    
    if trx_status == 'cancelled':
        ref_trx = MoneyTransaction.objects.create(
            user = user,
            amount = f"{trx.amount}",
            net_charges = 0.00,
            status = 'success',
            transaction_type = 'Refund',
        )
        ref_trx.save()
        ref_trx_data = MoneyTransactionSerializer(ref_trx).data
    data = {
        "type":"send_response",
        "signal_name" : 'money_trx',
        'signal_type' : 'refund' if trx_status == 'cancelled' else None ,
        # if this trx is refunding trx itll be treadted otherwise 
        'trx':ref_trx_data if trx_status == 'cancelled' else None,
        "updated_trx":trx_data,
        "user":user_data
    }
    signal_sender(user_room,data) # send trx to the target user
    
    # create notification 
    refund_body = f'Your N{trx.amount} has been refunded. Reason is ({reason})'
    approval_body = f'Your withdrawal request has been approved. Amount: N{trx.amount}'
    notif = Notification.objects.create(
        user = user,
        title = 'Money Refund ' if trx_status == 'cancelled' else 'Withdrawal Approved',
        body =refund_body if trx_status == 'cancelled' else approval_body,
        type = 'success'
    )
    notif.save()
    
    notif = NotificationSerializer(notif).data
    data2 = {
        "type":"send_response",
        "signal_name" : 'money_notif',
        "notif":notif,
        "user":user_data
    }
    signal_sender(user_room,data2) # send notif to target user 
    return trx_data

def createInternalTrx (request,recipient):
    # send notification and update the user  via websocket
    user = request.user
    amount = request.data.get('amount')
    user_room = f"room{user.id}"
    recipient_room = f"room{recipient.id}"
    
    user_data = UserSerializer(user).data
    recipient_data = UserSerializer(recipient).data
    # create trx 
    user_trx = MoneyTransaction.objects.create(
        user = user,
        amount = f"{amount}",
        net_charges = 0.00,
        status = 'success',
        transaction_type = 'Transfer-Out',
        notes = request.data.get('note'),
        receiver = recipient
    )
    user_trx.save()
    recipient_trx = MoneyTransaction.objects.create(
        user = recipient,
        amount = f"{amount}",
        net_charges = 0.00,
        status = 'success',
        transaction_type = 'Transfer-In',
        notes = request.data.get('note')
    )
    recipient_trx.save()
    
    trx = MoneyTransactionSerializer(user_trx).data
    user_resp = {
        "trx":trx,
        "user":user_data
    }
    # for recipient responses 
    trx = MoneyTransactionSerializer(recipient_trx).data
    recipient_resp = {
        "type":"send_response",
        "signal_name" : 'money_trx',
        "trx":trx,
        "user":recipient_data
    }
    
    recipient_notif = Notification.objects.create(
        user = recipient,
        title = 'Internal Transfer Comfirmed',
        body =f'{user.username} has sent you {amount}',
        type = 'success'
    )
    recipient_notif.save()
    recipient_notif = NotificationSerializer(recipient_notif).data
    
    data2 = {
        "type":"send_response",
        "signal_name" : 'money_notif',
        "notif":recipient_notif,
        "user":user_data
    }
    signal_sender(recipient_room,data2) # send totic=fication to recipient
    signal_sender(recipient_room,recipient_resp) # send trx to reciepient
    return user_resp
 
class SendMoneyView(APIView):
    def post(self, request):
        try:
            user = request.user
            amount = request.data.get('amount')
            recipient_id = request.data.get('recipient')
            try:
                recipient = User.objects.get(id = recipient_id)
            except:
                return Response({"error":"recipient not found"}, status=status.HTTP_200_OK) 
            
            # user cannot send money to him self
            if str(user.id) == str(recipient_id):
                return Response({"error":"you cannot send money to your self"}, status=status.HTTP_200_OK)
            
            # validate pin here
            pin = request.data.get('payment_pin')
            if user.payment_pin != pin :
                return Response({"error":"wronge pin"}, status=status.HTTP_200_OK)
            
            if user and float(user.account.account_balance) >= float((amount)) :
                # debit and credit here 
                user.account.debit(float(amount)) #user debited
                recipient.account.deposite(float(amount)) #recipient credited
               # send Email and Notification here 
                response = createInternalTrx(request,recipient)
                if response :
                    return Response({"success":"money sent",'data':response}, status=status.HTTP_200_OK)
            else:
                return Response({"error":"not enough balance"}, status=status.HTTP_200_OK)
        except:
            return Response({"error":"server went wrong"}, status=status.HTTP_408_REQUEST_TIMEOUT)
        
class WithdrawalView(APIView):
    def post(self, request):
        # try:
            user = request.user
            amount = request.data.get('amount')
            
            # validate pin here
            pin = request.data.get('payment_pin')
            if user.payment_pin != pin :
                return Response({"success":"wronge pin"}, status=status.HTTP_200_OK)
            
            if user and float(user.account.account_balance) >= float((amount)) :
                # debit and credit here 
                user.account.debit(float(amount)) #user debited
                user_data = createWithdrawalTrx(request)
                
                # send Email and Notification here  
                return Response({"success":"success",'resp':user_data}, status=status.HTTP_200_OK)
            else:
                return Response({"success":"not enough balance"}, status=status.HTTP_200_OK)
        # except:
            # return Response({"error":"server went wrong"}, status=status.HTTP_408_REQUEST_TIMEOUT)
class WithdrawalRequestView(APIView):
    def get(self, request):
        paginator = CustomPagination()
        try:
            # pending_withdrawals = MoneyTransaction.objects.filter(transaction_type = 'Withdraw',status = 'pending')
            pending_withdrawals = MoneyTransaction.objects.filter(transaction_type = 'Withdraw')
            paginated_data = paginator.paginate_queryset(pending_withdrawals,request)
            pending_withdrawals = MoneyTransactionSerializer(paginated_data,many=True).data
            pending_withdrawals = paginator.get_paginated_response(pending_withdrawals)
            return Response({'data':pending_withdrawals.data['results']}, status=status.HTTP_200_OK)
        except:
            return Response({"error":"server went wrong"}, status=status.HTTP_408_REQUEST_TIMEOUT)
        
    def post(self, request,):
        # try:
            user = request.user
            trx_id = request.data.get('trx_id')
            approval = request.data.get('approval')
            payment_pin = request.data.get('payment_pin')
            try :
                trx = MoneyTransaction.objects.get(id = trx_id)
            except :
                return Response({"success":"this trx is not found"}, status=status.HTTP_200_OK)
            
            if str(user.payment_pin) != str(payment_pin) :
                return Response({"success":"wronge pin"}, status=status.HTTP_200_OK)
            # only admin can approve trx
            if user.is_superuser == False:
                return Response({"success":"you are not allowed to process this trx"}, status=status.HTTP_200_OK)
            
            # check if transection already approved
            if not trx.status == 'pending':
                return Response({"success":"this trx is already processed"}, status=status.HTTP_200_OK)
            # validate pin here     
 
            if approval == 'approve': # the withdrawal is approved
                # configure flutter wave here 
                url = "https://api.flutterwave.com/v3/transfers"
                payload = {
                    "account_bank": f"{trx.withdrawal_bank_code}",
                    "account_number": f"{trx.withdrawal_account_number}",
                    "amount": int(trx.amount),
                    "currency": f"NGN",
                    "beneficiary_name": f"{trx.withdrawal_account_name}",
                    "debit_currency": f"NGN",
                    "reference": f"{trx.id}",
                    # "callback_url": f"https://webhook.site/5f9a659a-11a2-4925-89cf-8a59ea6a019a",
                    "narration": f"withdrawal from {trx.user.username}",
                }
                headers = {
                "accept": "application/json",
                "Authorization": f"Bearer {FLW_SECRET_KEY}",
                "Content-Type": "application/json"
                }
                # response = requests.post(url, json=payload, headers=headers)
                # print('response: ', response.text)
                print(approval)
                reason = request.data.get('reason')
                cancelled_trx =  createWithdrawalStatusChangeTrx(user,trx,reason,'approved')
                return Response({"success":"withdrawal cancelled",'data':cancelled_trx}, status=status.HTTP_200_OK)
             
                
            else: # approval == 'cancel' 
                # initiate refund here and send notification to the user with transection
                # create refund trx here and notify user 
                trx.user.account.deposite(float(trx.amount))
                reason = request.data.get('reason')
                cancelled_trx =  createWithdrawalStatusChangeTrx(user,trx,reason,'cancelled')
                return Response({"success":"withdrawal cancelled",'data':cancelled_trx}, status=status.HTTP_200_OK)
            
            # return Response({'data':"success"}, status=status.HTTP_200_OK)
        # except:
            # return Response({"error":"server went wrong"}, status=status.HTTP_408_REQUEST_TIMEOUT)