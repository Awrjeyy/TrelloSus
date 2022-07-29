from rest_framework import serializers
from users.models import CustomUser
from django.core.validators import RegexValidator
from django.contrib.auth.password_validation import validate_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = (
            'id',
            'email',
            'first_name',
            'last_name',
            'bio',
            'user_img',
        )

class RegisterSerializer(serializers.ModelSerializer):
    alpha = RegexValidator(r'^[a-zA-Z]*$', 'Only alphabet characters are allowed.')
    first_name = serializers.CharField(label="First name", required=True, max_length=100, validators=[alpha])
    last_name = serializers.CharField(label="Last name", required=True, max_length=100, validators=[alpha])
    password = serializers.CharField(required=True, write_only=True, validators=[validate_password])
    password1 = serializers.CharField(required=True, write_only=True)

    class Meta:
        model = CustomUser
        fields = (
            'email',
            'first_name',
            'last_name',
            'password',
            'password1',
        )
    def validate(self, attrs):
        if attrs['password'] != attrs['password1']:
            raise serializers.ValidationError({'password': "Password fields don't match."})
        return attrs

    def create(self, validated_data):
        user = CustomUser.objects.create(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )
        user.set_password(validated_data['password'])
        user.save()

        return user

class LoginSerializer(serializers.ModelSerializer):

    email =  serializers.CharField()
    password = serializers.CharField(required=True, write_only=True, validators=[validate_password])

    class Meta:
        model: CustomUser
        fields = (
            'email',
            'password',
        )

class UpdateUserSerializer(serializers.ModelSerializer):
    user_img = serializers.ImageField(required=False)
    alpha = RegexValidator(r'^[a-zA-Z]*$', 'Only alphabet characters are allowed.')
    first_name = serializers.CharField(label="First name", required=False, max_length=100, validators=[alpha])
    last_name = serializers.CharField(label="Last name", required=False, max_length=100, validators=[alpha])
    bio = serializers.CharField(default="Put your bio", required=False)

    class Meta:
        model = CustomUser
        fields = (
            'user_img',
            'first_name',
            'last_name',
            'bio',
        )

    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('request', None)
        return super(UpdateUserSerializer, self).__init__(*args, **kwargs)

    def updateuser(self, instance, validated_data):
        
        user = self.request.user
        if user.pk != instance.pk:
            raise serializers.ValidationError({"authorize": "You dont have permission for this user."})
        
        user.first_name = validated_data['first_name']
        user.last_name = validated_data['last_name']
        user.user_img = validated_data['user_img']
        user.bio = validated_data['bio']

        user.save()

        return instance
