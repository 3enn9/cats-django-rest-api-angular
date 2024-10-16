import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service'; // Сервис для 
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';  // Импорт Router

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  formLogin = new FormGroup({
    login: new FormControl(null),
    password: new FormControl(null),
  });

  constructor(private apiUser: UserService, private router: Router) {}
  
  ngOnInit(): void{

  }

  login(){
    console.log("Start login...")

    const loginValue = this.formLogin.value.login;
    const passwordValue = this.formLogin.value.password;
    
    // Проверяем, что значения логина и пароля не равны null или undefined
    if (loginValue && passwordValue) {
      this.getToken(loginValue, passwordValue);
    } else {
      console.error("Форма недействительна. Пожалуйста, заполните все поля для входа.");
    }
  }

  getToken(Username: string, Password: string){
    this.apiUser.getToken(Username, Password).subscribe(
      data => {
        console.log(data);
        
        localStorage.setItem('auth-token', data.auth_token)
        this.router.navigate(['']);  // Укажите нужный маршрут
      },
      error => {
        console.log(error);
        
      }
    )
  }
}