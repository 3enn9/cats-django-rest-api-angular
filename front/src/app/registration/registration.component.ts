import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';  // Импорт Router

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
registerForm: any;
constructor(private ApiUser: UserService, private router: Router, private apiUser: UserService){}

FormRegister = new FormGroup({
  email: new FormControl(null),
  username: new FormControl(null),
  password: new FormControl(null),
});

ngOnInit(): void {

}

registration(){
  console.log("start...")
  const formData = this.FormRegister.value;
  console.log(formData)
  if (formData.email && formData.username && formData.password) {
    this.createUser(formData.email, formData.username, formData.password);
    this.getToken(formData.username, formData.password)
  } else {
    console.error("Форма недействительна. Пожалуйста, заполните все поля.");
  }
}
createUser(Email: string, Username: string, Password: string){
  this.ApiUser.createUser(Email, Username, Password).subscribe(
    data => {
      console.log("create");
    },
    error => {
      console.log(error)
    }
  )
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
