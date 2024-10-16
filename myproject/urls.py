from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
# from cats.views import CatViewSet, RegisterView, chat_view, LoginView, LogoutView
from cats.views import MessageListView, CatViewSet

# Создаем маршрутизатор и регистрируем CatViewSet
router = DefaultRouter()
router.register(r'cats', CatViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),  # Подключаем маршруты из router
    path('api/v1/user/', include('user.urls')),
    path('api/v1/auth/', include('djoser.urls')),
    path('api/v1/auth-token/', include('djoser.urls.authtoken')),
    path('api/messages/', MessageListView.as_view(), name='message_list')
    # path('ws/chat/', chat_view, name='chat'),  # Веб-сокеты для чата
]
