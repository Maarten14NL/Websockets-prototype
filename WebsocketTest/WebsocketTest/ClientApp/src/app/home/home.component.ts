import { Component, OnInit } from '@angular/core';
import * as signalR from '@aspnet/signalr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  user: string;
  message: string;

  messages: string[] = [];

  private connection: any = new signalR.HubConnectionBuilder()
    .withUrl(`/testHub`)
    .configureLogging(signalR.LogLevel.Information)
    .build();

  constructor() {
  }

  ngOnInit() {
    this.connection.start();
    this.connection.on('RecieveMessage', (fromUser, message) => {
      this.messages.push(fromUser + ': ' + message);
    });
  }

  sendMessage() {
    this.connection.invoke('SendMessage', this.user, this.message)
      .catch(err => console.error(err.toString()));
  }
}
