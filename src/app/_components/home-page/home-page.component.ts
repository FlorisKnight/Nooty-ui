import { Component, OnInit } from '@angular/core';
import {User} from '../../_domain/User';
import {Noot} from '../../_domain/Noot';
import {StorageService} from '../../_services/storage.service';
import * as moment from 'moment';
import { GravatarModule } from 'ngx-gravatar';
import {NootService} from '../../_services/noot.service';
import {FollowService} from '../../_services/follow.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public noots: Noot[] = [];
  public nootText: string;
  public user: User;

  fallbacks = ['retro'];

  constructor(
    private storageService: StorageService,
    private nootService: NootService,
    private followService: FollowService
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
    this.nootService.sendNoot(noot).then(noot2 => {
      this.noots.unshift(noot2);
    });
    this.nootText = '';
  }

  ngOnInit(): void {
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
  }
}
