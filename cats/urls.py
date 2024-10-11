from django.urls import path
from . import views

urlpatterns = [
    path('cats/', views.cat_list, name='cat_list'),
    path('cats/add/', views.cat_create, name='cat_add'),
    path('cats/<int:pk>/edit/', views.cat_edit, name='cat_edit'),
    path('cats/<int:pk>/delete/', views.cat_delete, name='cat_delete'),
]
