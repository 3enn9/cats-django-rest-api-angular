from django.contrib.auth.models import User
from django.shortcuts import render, get_object_or_404, redirect
from .models import Cat
from .forms import CatForm

def cat_list(request):
    cats = Cat.objects.filter(owner=request.user)
    return render(request, 'cat_list.html', {'cats': cats})

def cat_create(request):
    if request.method == 'POST':
        form = CatForm(request.POST)
        if form.is_valid():
            cat = form.save(commit=False)
            cat.owner = request.user
            cat.save()
            return redirect('cat_list')
    else:
        form = CatForm()
    return render(request, 'cat_form.html', {'form': form})

def cat_edit(request, pk):
    cat = get_object_or_404(Cat, pk=pk)
    if request.method == 'POST':
        form = CatForm(request.POST, instance=cat)
        if form.is_valid():
            form.save()
            return redirect('cat_list')
    else:
        form = CatForm(instance=cat)
    return render(request, 'cat_form.html', {'form': form})

def cat_delete(request, pk):
    cat = get_object_or_404(Cat, pk=pk)
    if request.method == 'POST':
        cat.delete()
        return redirect('cat_list')
    return render(request, 'cat_confirm_delete.html', {'cat': cat})


def chat_view(request):
    return render(request, 'chat/index.html')

from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages

def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('cat_list')  # Измените на нужный URL после входа
        else:
            messages.error(request, 'Неправильное имя пользователя или пароль')
    return render(request, 'login.html')


def register_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password1 = request.POST['password1']
        password2 = request.POST['password2']

        # Проверка параметров пароля
        if len(password1) < 8:
            messages.error(request, "Пароль должен содержать не менее 8 символов.")
        elif password1 != password2:
            messages.error(request, "Пароли не совпадают.")
        elif not any(char.isdigit() for char in password1):
            messages.error(request, "Пароль должен содержать хотя бы одну цифру.")
        elif not any(char in "!@#$%^&*()" for char in password1):
            messages.error(request, "Пароль должен содержать хотя бы один специальный символ.")
        else:
            User.objects.create_user(username=username, password=password1)
            messages.success(request, "Вы успешно зарегистрированы!")
            return redirect('login')

    return render(request, 'register.html')