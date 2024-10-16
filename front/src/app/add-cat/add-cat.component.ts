import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-add-cat',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-cat.component.html',
  styleUrls: ['./add-cat.component.css']
})
export class AddCatComponent {
  addCatForm: FormGroup; // Форма для добавления кота
  isUserAuthenticated: boolean = false; // Флаг для проверки аутентификации

  constructor(private product: ProductService, private router: Router) {
    this.addCatForm = new FormGroup({
      name: new FormControl(null),
      breed: new FormControl(null),
      age: new FormControl(null),
      is_furry: new FormControl(false),
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('auth-token');

    // Проверяем, что токен не равен null
    this.isUserAuthenticated = !!token; // Устанавливаем флаг аутентификации
  }

  submitCatData() {
    if (this.isUserAuthenticated) {
      const catData = this.addCatForm.value; // Получаем данные формы
  
      // Передаём данные в метод addCat вашего сервиса
      this.product.addCat(catData.name, catData.breed, catData.age, catData.is_furry).subscribe(
        data => {
          console.log("Кот добавлен:", data);
          this.router.navigate(['']); // Перенаправление после добавления
        },
        error => {
          console.error("Ошибка при добавлении кота:", error);
        }
      );
    } else {
      console.error("Пользователь не аутентифицирован.");
      // Здесь можно добавить логику для уведомления пользователя о необходимости аутентификации
    }
  }
}
