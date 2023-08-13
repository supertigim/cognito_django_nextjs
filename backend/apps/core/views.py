import os
import requests

from django.http import JsonResponse
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.response import Response

from apps.core.serializers import GrantAccessSerializer
from apps.core.cognito import CognitoGroup

import logging
logger = logging.getLogger(__name__)

CAT_API_KEY = os.environ.get("CAT_API_KEY", default="")
CAT_GROUP = "cat_butler"

def get_groups(request):
    if request.auth is not None:
        if "cognito:groups" in request.auth.payload:
            return request.auth.payload["cognito:groups"]
    return []

# Create your views here.
def home(request):
    return JsonResponse({"info": "Django NextJS Course", "message": "ok"})

class GrantAccess(GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        """
        Grant access
        Grant access to current logged in user.
        """
        groups = get_groups(request)
        if CAT_GROUP in groups:
            logger.info("Permission already had!")
            return JsonResponse({"message": "Permission already given!!"}, status=status.HTTP_400_BAD_REQUEST)        

        CognitoGroup(request.user.username).add(CAT_GROUP)
        return JsonResponse({"message": "Permission granted!"})

class BlockAccess(GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        """
        Grant access
        Grant access to current logged in user.
        """
        groups = get_groups(request)
        if CAT_GROUP not in groups:
            logger.info("Permission already not given!")
            return JsonResponse({"message": "Permission already not given!!"}, status=status.HTTP_400_BAD_REQUEST) 

        CognitoGroup(request.user.username).remove(CAT_GROUP) 
        return JsonResponse({"message": "Permission blocked!"})

class GetCatImage(GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        """
        Get cat image
        Get cat image.
        """
        groups = get_groups(request)
        if CAT_GROUP not in groups:
            logger.info("Permission required!")
            return JsonResponse({"message": "Permission required!"}, status=status.HTTP_405_METHOD_NOT_ALLOWED) 

        try:
            data = requests.get("https://api.thecatapi.com/v1/images/search")
            data = data.json()
            get = data[0]
            img_url = get["url"]
            return JsonResponse({"image": img_url})
        except Exception as e:
            print(e)
        return JsonResponse({"message": "Error"}, status=status.HTTP_400_BAD_REQUEST)
