import { Component, OnInit } from '@angular/core';
import {Noot} from '../../_domain/Noot';
import {User} from '../../_domain/User';
import {StorageService} from '../../_services/storage.service';
import {NootService} from '../../_services/noot.service';
import * as moment from 'moment';
import {MessageService} from '../../_services/message.service';
import {Stomp} from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import {EncapsulatedMessage} from '../../_domain/EncapsulatedMessage';
import {NootInitViewModel} from '../../_domain/viewmodels/NootInitViewModel';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-global-timeline',
  templateUrl: './global-timeline.component.html',
  styleUrls: ['./global-timeline.component.scss']
})
export class GlobalTimelineComponent implements OnInit {

  public stompClient;
  public noots: Noot[] = [];
  public nootText: string;
  public user: User;

  constructor(
    private storageService: StorageService,
    private nootService: NootService,
    private messageService: MessageService
  ) {
    this.user = this.storageService.user.getValue();
    this.noots = [];
    this.nootText = '';
  }

  sendNoot() {
    const noot = new Noot();
    noot.newNoot(this.nootText, moment().format('x'), this.storageService.user.getValue().id);
    this.nootText = '';
    this.sendMessage(JSON.stringify(new EncapsulatedMessage('noot.post', JSON.stringify(noot))));
  }

  handleMessage(message: EncapsulatedMessage) {
      // this methed handles all the incoming messages
      switch (message.messageType) {
        default:
          console.log('Unknown messageType: ' + message.messageType);
          break;
        case ('noot.post'):
          const noot = new Noot();
          noot.newNootNoot(JSON.parse(message.messageData));
          this.noots.unshift(noot);
          break;
        case ('noot.init'):
          const initNoots: Noot[] = JSON.parse(message.messageData);
          for (const n of initNoots) {
            const noot2 = new Noot();
            noot2.newNootNoot(n);
            this.noots.push(noot2);
          }
          console.log(message.messageData);
          this.noots.concat(initNoots);
          console.log('received');
          break;
        case ('noot.paginate'):
          const paginateNoots: Noot[] = JSON.parse(message.messageData);
          this.noots.concat(paginateNoots);
          break;
      }
    }

  initializeWebSocketConnection() {
    const serverUrl = environment.websocket_url;
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);

    const that = this;
    // tslint:disable-next-line:only-arrow-functions
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe('/user/personal', (message) => {
        that.handleMessage(JSON.parse(message.body));
      });
      that.stompClient.subscribe('/global', (message) => {
        that.handleMessage(JSON.parse(message.body));
      });
    });
  }

  sendMessage(message) {
    this.stompClient.send('/app/post/noot' , {}, message);
  }

  ngOnInit(): void {
    /*
      this.nootService.getAllNoots().then(list => {
      for (const n of list) {
        const noot = new Noot();
        noot.id = n.id;
        noot.text = n.text;
        noot.timestamp = n.timestamp;
        noot.userId = n.userId;
        this.noots.unshift(noot);
      }
    });
     */
      this.initializeWebSocketConnection();
      setTimeout(() => {
      this.sendMessage(
      JSON.stringify(
        new EncapsulatedMessage(
          'noot.init',
          JSON.stringify(
            new NootInitViewModel(
              this.storageService.user.getValue().id,
              'global'))))); }, 1000);
  }
}
