from django.urls import path

from apps.core.views import home, GrantAccess, BlockAccess, GetCatImage

urlpatterns = [
    path("", home, name="home"),
    path("grant-access", GrantAccess.as_view(), name="grant-access"),
    path("block-access", BlockAccess.as_view(), name="block-access"),
    path("cat", GetCatImage.as_view(), name="get-cat-image"),
]
