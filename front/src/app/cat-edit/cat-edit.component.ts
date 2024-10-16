import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cat-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cat-edit.component.html',
  styleUrl: './cat-edit.component.css'
})
export class CatEditComponent {
  catId: string = '';
  cat: any = {};
  isUserAuthenticated: boolean = false; // Флаг для проверки аутентификации

  constructor(
    private apiProduct: ProductService, 
    private http: HttpClient,
    private apiUser: UserService, 
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {  
    const token = localStorage.getItem('auth-token');
    this.catId = this.route.snapshot.paramMap.get('id')!;
    this.getCatDetails();
    // Проверяем, что токен не равен null
    this.isUserAuthenticated = !!token; // Устанавливаем флаг аутентификации
  }
  
  updateCat = () =>{
    if (this.isUserAuthenticated){
      const id = this.route.snapshot.paramMap.get('id');
      if (id !== null) {
        this.apiProduct.updateCat(this.catId, this.cat).subscribe(
          data =>{ 
            console.log('Кот успешно обновлён');
            this.router.navigate(['']);
          }, error => {
            console.error('Ошибка при обновлении кота:', error);
          }
        )
      } else {
        // Обработка случая, когда id равно null
        console.error('ID is null');
  
          }
    }else {
      console.error("Пользователь не аутентифицирован.");
      // Здесь можно добавить логику для уведомления пользователя о необходимости аутентификации
    }
  }
  getCatDetails(): void {
    this.apiProduct.catDetail(this.catId).subscribe(data => {
      this.cat = data;
    }, error => {
      console.error('Ошибка при получении данных кота:', error);
    });
}
}
