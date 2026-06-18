from django.shortcuts import render
from .models import *

def live_view(request):
    latest_log = Log.objects.order_by(
        'timestamp'
    ).first()

    return render(
        request,
        'live.html',
        {
            'latest_log': latest_log
        }
    )

def history_view(request):
    logs = Log.objects.order_by(
        'timestamp'
    )
    return render(
        request,
        'history.html',
        {
            'logs':logs
        }
    )

