import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() {}
  public stompClient;
  public msg = [];

  initializeWebSocketConnection() {
    const serverUrl = 'http://localhost:8041/socket';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    // tslint:disable-next-line:only-arrow-functions
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe('/global', (message) => {
        if (message.body) {
          that.msg.push(message.body);
        }
      });
    });
  }

  sendMessage(message) {
    this.stompClient.send('/app/post/noot' , {}, message);
  }
}
