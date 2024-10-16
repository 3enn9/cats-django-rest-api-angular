import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cat-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cat-detail.component.html',
  styleUrl: './cat-detail.component.css'
})
export class CatDetailComponent {
  cat: any = {};
  isUserAuthenticated: boolean = false; // Флаг для проверки аутентификации

  constructor(private apiProduct: ProductService,
     private http: HttpClient, 
     private apiUser: UserService, 
     private route: ActivatedRoute, 
     private router: Router) {}

  ngOnInit(): void {  
    const token = localStorage.getItem('auth-token');

    // Проверяем, что токен не равен null
    this.isUserAuthenticated = !!token; // Устанавливаем флаг аутентификации
    
    this.catDetail();
  }
  
  catDetail = () => {
    if (this.isUserAuthenticated){
      const id = this.route.snapshot.paramMap.get('id');
      if (id !== null) {
        this.apiProduct.catDetail(id).subscribe(
          data => {
            this.cat = data;
            console.log('Cat data loaded:', data); // Логирование загруженных данных
          },
          error => {
            console.error('Ошибка загрузки данных кота:', error);
          }
        );
      } else {
        console.error('ID is null');
      }
    } else {
      console.error('Пользователь не аутентифицирован.');
    }
  }
  
  deleteCat = () => {
    const catId = this.route.snapshot.paramMap.get('id');
    if (catId) {
      this.apiProduct.deleteCat(catId).subscribe(() => {
        console.log("Кот успешно удалён");
        this.router.navigate(['']); // Перенаправление на страницу со списком котов
      }, error => {
        console.error("Ошибка удаления кота:", error);
      });
    }
  }
}