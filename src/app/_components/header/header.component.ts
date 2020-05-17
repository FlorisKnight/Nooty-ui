import { Component, OnInit } from '@angular/core';
import {User} from '../../_domain/User';
import {StorageService} from '../../_services/storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public user: User;

  constructor(
    private storageService: StorageService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.user = this.storageService.user.getValue();
  }

}
