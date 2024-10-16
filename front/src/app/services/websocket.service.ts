import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private ws: WebSocketSubject<any>;

  constructor() { 
    this.ws = new WebSocketSubject('ws://localhost:8000/ws/chat/');
  }

  // Отправка сообщения на WebSocket сервер
  sendMessage(user: string, message: string) {
    this.ws.next({ type: 'chat_message', user, content: message }); // Отправляем пользователя и сообщение
  }
    
  // Получение сообщений
  getMessages(): Observable<any> {
    return this.ws.asObservable();
  }

  // Закрытие соединения
  closeConnection() {
    this.ws.complete();
  }
}
