import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {AuthenticationService} from '../../_services/authentication.service';
import {Router, RouterStateSnapshot} from '@angular/router';
import {FollowService} from '../../_services/follow.service';
import {StorageService} from '../../_services/storage.service';
import {User} from '../../_domain/User';
import {UserService} from '../../_services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public users: User[];
  public tittle: string;

  constructor(
    private followService: FollowService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.tittle = '';
    this.users = [];
    const snapshot: RouterStateSnapshot = this.router.routerState.snapshot;

    // Allow an action to be passed in the url (i.e. example.com/login?action=logout)
    switch (snapshot.root.queryParams.action) {
      case 'following': {
        console.log('following');
        this.tittle = 'Following';

        this.getFollowing(snapshot.root.queryParams.id)
        break;
      }
      case 'followers': {
        console.log('followers');
        this.tittle = 'Followers';

        this.getFollowers(snapshot.root.queryParams.id)
        break;
      }
    }
  }

  private getFollowers(id: string): void {
    let list = [];
    this.followService.getFollowers(id).then(followers => {
      list = followers;
      this.setUsers(list);
    });
  }

  private getFollowing(id: string): void {
    let list = [];
    this.followService.getFollowing(id).then(followers => {
      list = followers;
      this.setUsers(list);
    });
  }

  private setUsers(userIds: string[]): void {
    for (const u of userIds) {
      this.userService.getByID(u).then(user => {
        console.log('test');
        this.users.push(user);
      });
    }
}

}
