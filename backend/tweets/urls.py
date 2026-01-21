# tweets/urls.py
from django.urls import path, include
from rest_framework import routers
from .views import TweetViewSet
from . import views

router = routers.SimpleRouter()
router.register(r'tweets', TweetViewSet, basename='tweet')

urlpatterns = [
    path('', include(router.urls)),
]