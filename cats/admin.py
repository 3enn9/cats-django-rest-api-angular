from django.contrib import admin
from cats.models import Cat, Message

# Регистрация модели Cat
admin.site.register(Cat)

# Регистрация модели Message
admin.site.register(Message)
