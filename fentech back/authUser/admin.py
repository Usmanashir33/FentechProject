from django.contrib import admin
from.models import User , KYC

# Register your models here.
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display =["ID","username","phone_number","email","kyc_confirmed",'email_varified','is_active','log_with_otp',"refarrel_code","is_staff"]
    list_filter=['date_joined','email']
    search_fields =['username','email','id',"phone_number"]
    # list_filter=['','username','email','phone_number']
    # list_editable =["kyc_confirmed","email_varified","log_with_otp","lock_password","is_staff",'transection_permission']
    # fieldsets = (
    #     ("User Details", {
    #         'fields': (
    #             "username","phone_number","email",'picture'
    #         ),
    #     }),
    #     ("User limitations", {
    #         'fields': (
    #             "kyc_confirmed","email_varified",
    #             "log_with_otp",
    #         ),
    #     }),
    #     ("User Security", {
    #         'fields': (
    #             'lock_password','payment_pin',
    #             "is_staff",'is_superuser',
    #             'transection_permission',
                
    #         ),
    #     }),
    # )
    
@admin.register(KYC)
class KYCAdmin(admin.ModelAdmin):
    list_display =["user","id_number","country","state","gender","date_of_birth"]
    list_filter=['date',]
    search_fields =['id_number','date','user',"country"]
    # list_filter=['','username','email','phone_number']
    # list_editable =["kyc_confirmed","email_varified","log_with_otp","lock_password","is_staff",'transection_permission']
    # fieldsets = (
    #     ("User Details", {
    #         'fields': (
    #             "username","phone_number","email",'picture'
    #         ),
    #     }),
    #     ("User limitations", {
    #         'fields': (
    #             "kyc_confirmed","email_varified",
    #             "log_with_otp",
    #         ),
    #     }),
    #     ("User Security", {
    #         'fields': (
    #             'lock_password','payment_pin',
    #             "is_staff",'is_superuser',
    #             'transection_permission',
                
    #         ),
    #     }),
    # )
    
