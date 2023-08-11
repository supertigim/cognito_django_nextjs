from django.urls import path

from apps.core.views import home, GrantAccess

urlpatterns = [
    path("", home, name="home"),
    path("grant-access", GrantAccess.as_view(), name="grant-access"),
]
