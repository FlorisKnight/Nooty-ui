import { Component, OnInit } from '@angular/core';
import {User} from '../../_domain/User';
import {Noot} from '../../_domain/Noot';
import {StorageService} from '../../_services/storage.service';
import * as moment from 'moment';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public noots: Noot[] = [];
  public nootText: string;
  private user: User;

  constructor(
    private storageService: StorageService
  ) {
    this.user = this.storageService.user.getValue();
  }

  private generateNoots(): void {
    let i = 0;
    while ( i < 10) {
      const delay = (Math.random() * 10) + (i + 1) * 180;
      this.noots.push(
        new Noot('This is a test noot.', moment().subtract(delay, 'minutes').format('x'), this.storageService.user.getValue())
      );
      i++;
    }
  }

  sendNoot() {
    const date = new Date();
    const noot = new Noot(this.nootText, moment().format('x'), this.storageService.user.getValue());
    this.noots.unshift(noot);
    this.nootText = '';
  }

  ngOnInit(): void {
    this.generateNoots();
  }

}
