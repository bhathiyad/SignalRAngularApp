import { Component, OnInit } from '@angular/core';
import { ViewMeetingsService } from './viewmeetings.service';
import { MeetingType } from './meetingType';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';

@Component({
  selector: 'app-viewmeetings',
  styleUrls: ['./viewmeetings.component.css'],
  templateUrl: './viewmeetings.component.html',
  providers: [ViewMeetingsService]
})
export class ViewMeetingsComponent implements OnInit {

  private _hubConnection: HubConnection | undefined;
  public async: any;

  loaderEnabled = false;
  errorMessage: string = null;
  meetingList: MeetingType[] = [];

  constructor(private _meetingService: ViewMeetingsService) {

  }

  ngOnInit(): void {

    this._meetingService.getMeetings()
      .subscribe(res => {
        this.meetingList = res;
      },
        error => {

          this.errorMessage = <any>error;
          this.loaderEnabled = false;

      });


    //SignalR event bindings
    this._hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://bpnewapi.azurewebsites.net/synchub') //https://localhost:44354/synchub
      .configureLogging(signalR.LogLevel.Trace)
      .build();

    this._hubConnection.start().catch(err => console.error(err.toString()));

    //Meeting data sync
    this._hubConnection.on('SendMeetingData', (data: any) => {
      console.log(data);
      this.meetingList.push(data);
    });

  }

}
