import { Injectable } from '@angular/core';
import * as Rx from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor() { }

  private subject: Rx.Subject<MessageEvent>;

  // Singleton om een websocketverbinding tot stand te brengen en terug te geven
  public connect(url): Rx.Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log('Successfully connected: ' + url);
    }
    return this.subject;
  }

  // Functie om de verbinding tot stand te brengen
  private create(url): Rx.Subject<MessageEvent> {
    // maak de verbinding
    const ws = new WebSocket(url);

    // koppel de websocket events
    const observable = Rx.Observable.create(
      // pure magie
      (obs: Rx.Observer<MessageEvent>) => {
        ws.onmessage = obs.next.bind(obs);
        ws.onerror = obs.error.bind(obs);
        ws.onclose = obs.complete.bind(obs);
        return ws.close.bind(ws);
      });
    // creer een event om berichten te kunnen versturen
    const observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };
    return Rx.Subject.create(observer, observable);
  }
}
