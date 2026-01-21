# users/urls.py

from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    UserViewSet,
    signup,
    MyTokenObtainPairView,
    profile,
    toggle_follow,
    followers_following,
    search_users,
    list_all_users
)

router = routers.SimpleRouter()
router.register('', UserViewSet, basename='users')

urlpatterns = [
    path('signup/', signup, name='signup'),
    path('profile/', profile, name='profile'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('toggle-follow/<int:user_id>/', toggle_follow, name='toggle-follow'),
    path('followers-following/', followers_following, name='followers-following'),
    path('search/', search_users, name='search-users'),
    path('list-all/', list_all_users, name='list-all-users'),  # Endpoint de debug

    # Sempre dejar o router por último!
    path('', include(router.urls)),
]
