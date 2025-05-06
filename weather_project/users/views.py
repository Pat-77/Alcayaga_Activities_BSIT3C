from rest_framework import generics
from .serializers import RegisterSerializer
from django.contrib.auth import get_user_model

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser  # Add IsAdminUser here
from rest_framework.response import Response

from rest_framework import viewsets
from .models import CustomUser
from .serializers import CustomUserSerializer

from rest_framework.permissions import AllowAny  # This allows unauthenticated access

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]  # Allow any user to register, no authentication required


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def protected_view(request):
    return Response({
        "message": "You are authenticated",
        "user": request.user.username
    })

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]  # This ensures only authenticated users can access the API.

    # # Optionally restrict access to admin users for create/update/delete actions:
    # def get_permissions(self):
    #     if self.action in ['create', 'update', 'destroy']:
    #         self.permission_classes = [IsAdminUser]  # Only admins can perform create/update/destroy
    #     return super().get_permissions()
