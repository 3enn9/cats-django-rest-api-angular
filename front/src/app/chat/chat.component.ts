import { Component } from '@angular/core';
import { WebsocketService } from '../services/websocket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  messages: any[] = []; // Массив для хранения сообщений
  message: string = '';
  user: any; 

  constructor(private websocketService: WebsocketService, private user_token: UserService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('auth-token');
    if (token) {
      this.user = this.user_token.getUserWithToken(token).subscribe(user =>{
        this.user = user;
        console.log(this.user)    
      })
    }

    // Подписка на сообщения
    this.websocketService.getMessages().subscribe((data) => {
      // Обработка полученных данных
      this.messages.push(data); // Добавляем новое сообщение в массив
    });
  }

  sendMessage(message: string) {
    if (this.user && message.trim()) { // Проверяем, что объект пользователя доступен
      this.websocketService.sendMessage(this.user.username, message); // Отправляем пользователя и сообщение
      this.message = ''
    } else {
      console.error('Пользователь не загружен');
    }
  }
}