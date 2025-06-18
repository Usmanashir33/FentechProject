from django.urls import path
from .views import AccountNumberCreationView,FlutterWebHookView,TransectionsView,NotificationsView,ReadNotificationsView
from .views import DeleteNotificationsView,SettingWithDrawalAccount,FetchWithdrawalAccount,EditWithdrawalAccount
from .trx_views import SendMoneyView,WithdrawalView,WithdrawalRequestView,RecentReciepientsView
urlpatterns = [
    path('generate-account-number/', AccountNumberCreationView.as_view(),name='generate-account-number'),
    path('flutter-webhook/', FlutterWebHookView.as_view(),name='generate-account-number'),
    path('trxs/', TransectionsView.as_view(),name='transections'),
    path('recent_recipients/', RecentReciepientsView.as_view(),name='recent_recipients'),
    path('notif/', NotificationsView.as_view(),name='notifications'),
    path('read_notif/', ReadNotificationsView.as_view(),name='notifications_read'),
    path('delete_notifs/', DeleteNotificationsView.as_view(),name='notifications_delete'),
    path('delete_notif/<uuid:notif_id>/', DeleteNotificationsView.as_view(),name='notification_delete'),
    path('setting_withdrowal_acc/', SettingWithDrawalAccount.as_view(),name='setting-withdrawal-account'),
    path('getting_withdrowal_acc/', FetchWithdrawalAccount.as_view(),name='getting-withdrawal-account'),
    path('edit_withdrowal_acc/<int:account_id>/', EditWithdrawalAccount.as_view(),name='delete-withdrawal-account'),
    path('send-money/',SendMoneyView.as_view(),name='sendmoney'),
    path('withdraw-money/',WithdrawalView.as_view(),name='withdrawmoney'),
    path('withdraw-money-requests/',WithdrawalRequestView.as_view(),name='withdrawmoney'),
]
