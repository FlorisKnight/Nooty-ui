import { Component, OnInit } from '@angular/core';
import {User} from '../../_domain/User';
import {Noot} from '../../_domain/Noot';
import {StorageService} from '../../_services/storage.service';
import * as moment from 'moment';
import {NootService} from '../../_services/noot.service';
import {FollowService} from '../../_services/follow.service';
import {EncapsulatedMessage} from '../../_domain/EncapsulatedMessage';
import {Stomp} from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import {NootInitViewModel} from '../../_domain/viewmodels/NootInitViewModel';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public stompClient;
  public noots: Noot[] = [];
  public nootText: string;
  public user: User;

  fallbacks = ['retro'];

  constructor(
    private storageService: StorageService,
    private nootService: NootService,
    private followService: FollowService,
  ) {
    this.user = this.storageService.user.getValue();
    this.noots = [];
    this.nootText = '';
  }

  private generateNoots(): void {
    let i = 0;
    while (i < 10) {
      const delay = (Math.random() * 10) + (i + 1) * 180;
      const noot = new Noot();
      noot.newNoot('This is a test noot.', moment().subtract(delay, 'minutes').format('x'), this.storageService.user.getValue().id);
      this.noots.push(
        noot
      );
      i++;
    }
  }

  sendNoot() {
    const date = new Date();
    const noot = new Noot();
    noot.newNoot(this.nootText, moment().format('x'), this.storageService.user.getValue().id);
    /*
    this.nootService.sendNoot(noot).then(noot2 => {
      this.noots.unshift(noot2);
    });
     */
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

  initializeWebSocketConnection(nootInitViewModel: NootInitViewModel) {
    const serverUrl = environment.websocket_url;
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);

    const that = this;
    // tslint:disable-next-line:only-arrow-functions
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe('/user/personal', (message) => {
        that.handleMessage(JSON.parse(message.body));
      });
    });
  }

  ngOnInit(): void {
    /*
    this.followService.getFollowing(this.user.id).then(following => {
      this.nootService.getNootsTimeline(following, '0').then(list => {
        for (const n of list) {
          const noot = new Noot();
          noot.id = n.id;
          noot.text = n.text;
          noot.timestamp = n.timestamp;
          noot.userId = n.userId;
          this.noots.unshift(noot);
        }
      });
    });
     */
    this.followService.getFollowing(this.user.id).then(following => {
      const nootInitViewModel = new NootInitViewModel(this.user.id, this.user.id);
      nootInitViewModel.ammount = 20;
      if (this.noots.length > 0) {
        nootInitViewModel.lastId = this.noots[this.noots.length + 1].id;
      } else {
        nootInitViewModel.lastId = '0';
      }
      nootInitViewModel.userIds = following;
      this.initializeWebSocketConnection(nootInitViewModel);
      setTimeout(() => {
        this.sendMessage(
          JSON.stringify(
            new EncapsulatedMessage(
              'noot.init',
              JSON.stringify(nootInitViewModel))
          )
        );
        }, 2000);
    });
  }

  sendMessage(message) {
    this.stompClient.send('/app/post/noot' , {}, message);
  }
}
