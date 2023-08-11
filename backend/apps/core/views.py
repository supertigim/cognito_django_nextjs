from django.shortcuts import render

from django.http import HttpResponse, JsonResponse
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import RetrieveModelMixin
from rest_framework.permissions import IsAuthenticated, AllowAny

from apps.core.serializers import GrantAccessSerializer
from config import settings

import logging

logger = logging.getLogger(__name__)


# Create your views here.
def home(request):
    logger.info(settings.COGNITO_ISSUER)
    logger.info(f"{settings.COGNITO_ISSUER}/.well-known/jwks.json")
    return JsonResponse({"info": "Django NextJS Course", "message": "ok"})


class GrantAccess(GenericAPIView):
    # serializer_class = GrantAccessSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        """
        Grant access
        Grant access to current logged in user.
        """
        logger.info(f"request.user: {request.user.is_authenticated}")
        # logger.info(request.headers)
        # logger.info(request.auth)
        # return JsonResponse({'error':'Unauthorized'}, status=401)
        return JsonResponse({"message": "Permission granted!"})
