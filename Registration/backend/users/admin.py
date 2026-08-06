from django.contrib import admin

# Register your models here.
from .models import User  # Replace User with your actual user model name

admin.site.register(User)
