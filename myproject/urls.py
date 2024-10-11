from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from cats import views

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include('cats.urls')),  # Подключаем API котов
    path('ws/chat/', views.chat_view, name='chat'),
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
]
