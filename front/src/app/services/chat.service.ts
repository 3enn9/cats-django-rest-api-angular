import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

   // Метод для создания заголовков с актуальным токеном
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth-token'); // Получаем токен каждый раз
    return new HttpHeaders({
      'Authorization': `Token ${token}`,
      'Content-Type': 'application/json'
  });
}

  saveMessage(message: any): Observable<any> {
    const headers = this.getHeaders(); // Получаем актуальные заголовки
    return this.http.post(this.apiUrl + 'api/messages/' , message, {headers: headers})
    .pipe(
      catchError(this.handleError)
    );
  }

  getMessages(): Observable<any[]> {
    const headers = this.getHeaders(); // Получаем актуальные заголовки
    return this.http.get<any[]>(this.apiUrl + 'api/messages/', {headers: headers})
    .pipe(
      catchError(this.handleError)
    ); // Получаем сообщения из базы данных
  }

  private handleError(error: any) {
    console.error('Произошла ошибка', error);
    return throwError('Что-то пошло не так; попробуйте снова позже.');
  }
}
