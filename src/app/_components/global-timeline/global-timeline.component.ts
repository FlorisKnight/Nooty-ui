import { Component, OnInit } from '@angular/core';
import {Noot} from '../../_domain/Noot';
import {User} from '../../_domain/User';
import {StorageService} from '../../_services/storage.service';
import {NootService} from '../../_services/noot.service';
import * as moment from 'moment';

@Component({
  selector: 'app-global-timeline',
  templateUrl: './global-timeline.component.html',
  styleUrls: ['./global-timeline.component.scss']
})
export class GlobalTimelineComponent implements OnInit {

  public noots: Noot[] = [];
  public nootText: string;
  public user: User;

  constructor(
    private storageService: StorageService,
    private nootService: NootService
  ) {
    this.user = this.storageService.user.getValue();
    this.noots = [];
    this.nootText = '';
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
  }
}
