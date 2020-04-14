import { Component, OnInit } from '@angular/core';
import {User} from '../../_domain/User';
import {Noot} from '../../_domain/Noot';
import {StorageService} from '../../_services/storage.service';
import * as moment from 'moment';
import { GravatarModule } from 'ngx-gravatar';
import {NootService} from '../../_services/noot.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public noots: Noot[] = [];
  public nootText: string;
  private user: User;

  fallbacks = ['retro'];

  constructor(
    private storageService: StorageService,
    private nootService: NootService
  ) {
    this.user = this.storageService.user.getValue();
  }

  private generateNoots(): void {
    let i = 0;
    while (i < 10) {
      const delay = (Math.random() * 10) + (i + 1) * 180;
      const noot = new Noot();
      noot.newNoot('This is a test noot.', moment().subtract(delay, 'minutes').format('x'), this.storageService.user.getValue())
      this.noots.push(
        noot
      );
      i++;
    }
  }

  getEmail(): string{
    return this.user.email;
  }
  sendNoot() {
    const date = new Date();
    const noot = new Noot();
    noot.newNoot(this.nootText, moment().format('x'), this.storageService.user.getValue())
    this.noots.unshift(noot);
    this.nootText = '';
  }

  ngOnInit(): void {
    this.generateNoots();
  }
}
