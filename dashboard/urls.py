from django.urls import path
from .views import *

urlpatterns = [
    path('', live_view, name='live'),
    path('history/', history_view, name='history'),
]

