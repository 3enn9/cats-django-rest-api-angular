import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseurl = environment.apiUrl

  constructor(private http: HttpClient) { }

  getCatList(): Observable<any>{
    const token = localStorage.getItem('auth-token'); // Получаем токен

    // Добавляем токен в заголовки
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`
    });

    return this.http.get(this.baseurl + 'api/cats/', { headers });
  }

  addCat(name: string, breed: string, age: number, is_furry: boolean): Observable<any> {
    const token = localStorage.getItem('auth-token'); // Получаем токен
  
    // Добавляем токен в заголовки
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json' // Устанавливаем тип контента
    });
  
    // Создаём тело запроса
    const body = {
      name: name,
      breed: breed,
      age: age,
      is_furry: is_furry
    };
  
    return this.http.post(this.baseurl + 'api/cats/', body, { headers });
  }

  catDetail(id: string){
    const token = localStorage.getItem('auth-token'); // Получаем токен
  
    // Добавляем токен в заголовки
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json' // Устанавливаем тип контента
    });
    return this.http.get(this.baseurl + 'api/cats/' + id, { headers});
  }

  deleteCat(id: string): Observable<any> {
    const token = localStorage.getItem('auth-token'); // Получаем токен
  
    // Добавляем токен в заголовки
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json' // Устанавливаем тип контента
    });

    return this.http.delete(this.baseurl + 'api/cats/' + id + '/', { headers}); // Запрос на удаление кота
  }
  updateCat(id: string, catData: any): Observable<any> {
    const token = localStorage.getItem('auth-token'); // Получаем токен
  
    // Добавляем токен в заголовки
    const headers = new HttpHeaders({
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json' // Устанавливаем тип контента
    });

    return this.http.put(this.baseurl + 'api/cats/' + id + '/', catData, { headers});
  }
}

