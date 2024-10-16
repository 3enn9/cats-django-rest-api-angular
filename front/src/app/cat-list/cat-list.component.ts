import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


interface Cat {  // Добавляем интерфейс
  id: number;
  name: string;
  breed: string;
  age: number;
  is_furry: boolean;
}


@Component({
  selector: 'app-cat-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cat-list.component.html',
  styleUrl: './cat-list.component.css'
})
export class CatListComponent {
  user: any;
  categoryes: Cat[] = [];

  constructor(private apiProduct: ProductService, private http: HttpClient, private apiUser: UserService) {}

  ngOnInit(): void {  
    const token = localStorage.getItem('auth-token');
    
    // Проверяем, что токен не равен null
    if (token) {
      this.getUserWithToken(token);
    } else {
      console.error("Токен не найден. Пожалуйста, войдите в систему.");
      // Здесь можно добавить логику для обработки отсутствия токена, например, перенаправление на страницу входа
    }
    
    this.getCatList();
  }
  

  getCatList = () => {
    this.apiProduct.getCatList().subscribe(
      data => {
        console.log(data)
        this.categoryes = data;
        
      },
      error => {
        console.log(error)
      });
  }

  getUserWithToken(MyToken: string){
    this.apiUser.getUserWithToken(MyToken).subscribe(
      data => {
        console.log(data);
        this.user = data;
      },
      error => {
        console.log(error);
        
      }
    )
    }

}
