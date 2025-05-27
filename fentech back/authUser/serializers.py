import random
from rest_framework.serializers import ModelSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.exceptions import ValidationError ,AuthenticationFailed
from account.serializers import   AccountSerializer
from account.models import   Account

from.models import User, KYC


def generate_verifed_email_otp() :
    code = random.randint(12345,98769)
    # code_exit = User.objects.get(email_verification_code = code).exists()
    return  code 
    # return  code if not code_exit else  generate_verifed_email_otp()

class MiniUserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = [
           "id","username","phone_number","email","picture",
            "transection_permission","refarrel_code","kyc_submitted",
            "kyc_confirmed","email_varified","is_staff","is_superuser",
        ]
        extra_kwargs = {'id' : {"read_only" : True},"password":{"write_only":True}}
                        
        
class KYCSerializer(ModelSerializer):
    # user = MiniUserSerializer(User,many = True)
    class Meta:
        model = KYC
        fields = "__all__"
        extra_kwargs  ={'id' : {"read_only" : True}}
        
    
class MiniKYCSerializer(ModelSerializer):
    class Meta:
        model = KYC
        fields = "__all__"
        extra_kwargs  ={'id' : {"read_only" : True}}

# import json
class UserSerializer(ModelSerializer):
    kyc = MiniKYCSerializer(KYC)
    account =  AccountSerializer(Account)
    
    class Meta:
       model = User
       exclude = ['password',"lock_password","payment_pin",'email_verification_code']
       extra_kwargs  ={'id' : {"read_only" : True},"password":{"write_only":True}}
    
    
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    userOtp = None 
    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)
        self.otp =  kwargs['data'].get('otp',None)
        CustomTokenObtainPairSerializer.userOtp = self.otp
        
    # Add custom claims
    
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        if user.log_with_otp :
            if  user.email_verification_code == cls.userOtp :
                generated_otp = generate_verifed_email_otp()
                user.email_verification_code = generated_otp
                # user.save()
                # we will send confirm login email 
                # send message here
                 
                return token
            else :
                raise AuthenticationFailed('invalid otp')
        else :
            return token
    
    
    # @classmethod
    # def get_current_user(cls, user):
    #     current_user = UserSerializer(user)
    #     return current_user.data
    