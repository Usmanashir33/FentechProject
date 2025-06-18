from django.urls import path
from rest_framework_simplejwt.views import (TokenObtainPairView,TokenRefreshView,)

from .views2 import RegisterView,RegisterVerifyView ,LoginRequestView,CurrentUserView
from .views2 import PasswordChangeView,PasswordResetView,SearchUserView
# SearchUserView,ProfilePictureView,PinResetRequestView,PasswordForgetRequestView,
from .views2 import PinChangeView,PasswordForgetView,VerifyWithEmailOtp


urlpatterns = [
    
    path('email-verif-code/',VerifyWithEmailOtp.as_view(),name='email-verification-otp'), 
    
    path('register/',RegisterView.as_view(),name='register'),  
    path('register/verify-email/',RegisterVerifyView.as_view(),name='register-verify'),
    
    path('loginRequest/',LoginRequestView.as_view(),name='login-requests'),
    path('current-user/',CurrentUserView.as_view(),name='get-current-user'),
    
    path('password-change/',PasswordChangeView.as_view(),name='password-change'),
    # path('password-reset-request/',PasswordResetRequestView.as_view(),name='password-reset-request'),
    path('password-reset/',PasswordResetView.as_view(),name='password-reset'),
    
    # path('password-forget-request/',PasswordForgetRequestView.as_view(),name='password-forget-request'),
    path('password-forget/',PasswordForgetView.as_view(),name='password-forget'),
    
    path('pin-change/',PinChangeView.as_view(),name='pin-change'),
    
    path("search-user/",SearchUserView.as_view(),name='search-user'),
    # path('update-pic/',ProfilePictureView.as_view(),name='update-profile-pic'),
    
    # from rest  frame work 
    path('api/login/', TokenObtainPairView.as_view(), name='login'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]