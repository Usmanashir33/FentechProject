from django.urls import path
from .consumers import FentchConsumer

websocket_urlpatterns = [
    path('fentech-live-server/', FentchConsumer.as_asgi()),
]
