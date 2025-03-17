from django.db import models

class Students(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    age = models.IntegerField()
    date_joined = models.DateTimeField(auto_now_add=True)
    phone_number = models.CharField(max_length=15, null=True, blank=True)  # New field

    def __str__(self):
        return f"{self.first_name} {self.last_name}"
