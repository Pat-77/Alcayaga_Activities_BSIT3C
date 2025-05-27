from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    is_agent = models.BooleanField(default=False)
    is_customer = models.BooleanField(default=True)

    def __str__(self):
        return str(self.username)

class Category(models.Model):
    name = models.CharField(max_length=100)

class Ticket(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=[('open', 'Open'), ('closed', 'Closed')])
    user = models.ForeignKey('user.CustomUser', on_delete=models.CASCADE)  # <-- change here
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)

class Comment(models.Model):
    ticket = models.ForeignKey(Ticket, related_name='comments', on_delete=models.CASCADE)
    user = models.ForeignKey('user.CustomUser', on_delete=models.CASCADE)  # <-- and here
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
