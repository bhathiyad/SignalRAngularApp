import { Component, OnInit } from '@angular/core';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';

@Component({
  selector: 'app-counter-component',
  templateUrl: './counter.component.html'
})
export class CounterComponent implements OnInit {
  private _hubConnection: HubConnection | undefined;
  public async: any;
  message = '';
  messages: string[] = [];

  constructor() {
  }
  public currentCount = 0;

  public incrementCounter() {
    this.currentCount++;
  }

  public sendMessage(): void {
    const data = `Sent: ${this.message}`;

    if (this._hubConnection) {
      this._hubConnection.invoke('Send', data);
    }
    this.messages.push(data);
  }

  ngOnInit() {
    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://bpnewapi.azurewebsites.net/synchub')//https://localhost:44354/
      .configureLogging(signalR.LogLevel.Trace)
      .build();

    this._hubConnection.start().catch(err => console.error(err.toString()));

    this._hubConnection.on('Send', (data: any) => {
      const received = `Received: ${data}`;
      this.messages.push(received);
    });

    //Meeting data sync
    this._hubConnection.on('SendMeetingData', (data: any) => {
      console.log(data);
    });

  }

}
