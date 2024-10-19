import { Component } from '@angular/core';
import { WebsocketService } from '../services/websocket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
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

    // Загружаем сообщения из localStorage
    this.loadMessagesFromLocalStorage();


    // Подписка на сообщения
    this.websocketService.getMessages().subscribe((data) => {
      // Обработка полученных данных
      this.messages.push(data); // Добавляем новое сообщение в массив
      this.saveMessagesToLocalStorage();
    });
  }

  sendMessage(message: string) {
    if (this.user && message.trim()) { // Проверяем, что объект пользователя доступен
      this.websocketService.sendMessage(this.user.username, message); // Отправляем пользователя и сообщение
      this.saveMessagesToLocalStorage(); // Сохраняем в localStorage
      this.message = ''
    } else {
      console.error('Пользователь не загружен');
    }
  }

  private saveMessagesToLocalStorage() {
    localStorage.setItem('chatMessages', JSON.stringify(this.messages));
  }

  private loadMessagesFromLocalStorage() {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      this.messages = JSON.parse(savedMessages);
    }
  }
} 