import { Component } from '@angular/core';
import { WebsocketService } from '../services/websocket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { RouterModule } from '@angular/router';
import { ChatService } from '../services/chat.service';



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

  constructor(
    private websocketService: WebsocketService,
    private user_token: UserService,
    private chatService: ChatService 
  ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('auth-token');
    if (token) {
      this.user = this.user_token.getUserWithToken(token).subscribe(user =>{
        this.user = user;
        console.log(this.user)    
      })
    }

    // Загружаем сообщения из localStorage
    this.loadMessagesFromDatabase();


    // Подписка на сообщения
    this.websocketService.getMessages().subscribe((data) => {
      // Обработка полученных данных
      this.messages.push(data); // Добавляем новое сообщение в массив
    });
  }

  sendMessage(message: string) {
    if (this.user && message.trim()) { // Проверяем, что объект пользователя доступен
      this.websocketService.sendMessage(this.user.username, message); // Отправляем пользователя и сообщение
      // Сохраняем сообщение в базу данных через сервис
      this.chatService.saveMessage({ message: message }).subscribe(
        (response) => {
          console.log('Сообщение сохранено в базе данных', response);
        },
        (error) => {
          console.error('Ошибка при сохранении сообщения', error);
        }
      );
      this.message = ''; // Очищаем поле ввода
    } else {
      console.error('Пользователь не загружен');
    }
  }

  private loadMessagesFromDatabase() {
    this.chatService.getMessages().subscribe(
      (messages) => {
        this.messages = messages; // Присваиваем сообщения из базы данных
      },
      (error) => {
        console.error('Ошибка при загрузке сообщений из базы данных', error);
      }
    );
  }
} 