from django.db import models

from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin, UserManager
from django.contrib.auth.validators import UnicodeUsernameValidator

from apps.core.models import AbstractBaseModel


class User(PermissionsMixin, AbstractBaseUser, AbstractBaseModel):

    is_active = models.BooleanField("Active", default=True)

    ### Cognito-user related fields ###
    # cognito-users don't have password, because they're authenticated via jwt token

    # For cognito-users username will contain `sub` claim from jwt token
    # (unique identifier (UUID) for the authenticated user)
    # which is coressponded to the username field in django
    username_validator = UnicodeUsernameValidator()
    username = models.CharField(
        "Username", max_length=255, unique=True, validators=[username_validator]
    )

    ### Django-user related fields ###
    # password is inherited from AbstractBaseUser
    email = models.EmailField("Email address", blank=True)  # allow non-unique emails
    is_staff = models.BooleanField(
        "staff status",
        default=False,
        help_text="Designates whether the user can log into this admin site.",
    )

    objects = UserManager()

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]  # used only on createsuperuser

    @property
    def is_django_user(self):
        # btw, all django-users is designed to be able to login into django-admin.
        # Filtering by 'is_staff' will also work
        return self.has_usable_password()
