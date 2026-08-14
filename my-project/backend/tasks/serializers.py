from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import User, Task

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'role', 'password', 'password2')
    
    def validate(self, attrs):
        p1 = attrs.get('password')
        p2 = attrs.get('password2')
        if p1 and p2 and p1 != p2:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs
    
    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(**validated_data)
        return user

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
        read_only_fields = ['user']