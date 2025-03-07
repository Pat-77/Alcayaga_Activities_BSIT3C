from django.db import models

# Create your models here.
class Item(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    
    objects = models.Manager()  # Explicitly define the default manager

    def __str__(self):
        return str(self.name)  # Ensure it's a string
