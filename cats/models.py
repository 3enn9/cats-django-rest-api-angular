from django.contrib.auth.models import User
from django.db import models

class Cat(models.Model):
    name = models.CharField(max_length=100)
    breed = models.CharField(max_length=100)
    age = models.IntegerField()
    is_furry = models.BooleanField(default=True)
    owner = models.ForeignKey(User, related_name='cats', on_delete=models.CASCADE)

    def __str__(self):
        return self.name
