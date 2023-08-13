import boto3

from django.conf import settings


class CognitoGroup:
    def __init__(self, username):
        self.username = username
        self.client = boto3.client(
            "cognito-idp",
            region_name=settings.COGNITO_AWS_REGION,
        )

    def add(self, group):
        return self.client.admin_add_user_to_group(
            UserPoolId=settings.COGNITO_USER_POOL,
            Username=self.username,
            GroupName=group,
        )

    def remove(self, group):
        return self.client.admin_remove_user_from_group(
            UserPoolId=settings.COGNITO_USER_POOL,
            Username=self.username,
            GroupName=group,
        )

    def list(self):
        response = self.client.admin_list_groups_for_user(
            UserPoolId=settings.COGNITO_USER_POOL, Username=self.username
        )
        return [group["GroupName"] for group in response["Groups"]]
