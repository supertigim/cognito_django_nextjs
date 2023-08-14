import os
from django.contrib.auth import get_user_model

User = get_user_model()

DJANGO_SUPERUSER_USERNAME = os.environ.get("DJANGO_SUPERUSER_USERNAME")
DJANGO_SUPERUSER_PASSWORD = os.environ.get("DJANGO_SUPERUSER_PASSWORD")

if User.objects.filter(username=DJANGO_SUPERUSER_USERNAME).exists():
    print("Superuser is already initialized!")
else:
    print("Initializing superuser...")
    try:
        superuser = User.objects.create_superuser(
            username=DJANGO_SUPERUSER_USERNAME,
            password=DJANGO_SUPERUSER_PASSWORD,
        )
        superuser.save()
        print("Superuser initialized!")
    except Exception as e:
        print(e)
