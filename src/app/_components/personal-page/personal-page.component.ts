import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, RouterStateSnapshot} from '@angular/router';
import {User} from '../../_domain/User';
import {UserService} from '../../_services/user.service';
import {Noot} from '../../_domain/Noot';
import {NootService} from '../../_services/noot.service';
import {StorageService} from '../../_services/storage.service';
import {FollowService} from '../../_services/follow.service';

@Component({
  selector: 'app-personal-page',
  templateUrl: './personal-page.component.html',
  styleUrls: ['./personal-page.component.scss']
})
export class PersonalPageComponent implements OnInit {
  public user: User;
  public noots: Array<Noot> = [];
  public textFollowBtn: string;
  private following: boolean;

  constructor(private router: Router,
              private userService: UserService,
              private nootService: NootService,
              private followService: FollowService,
              private storageService: StorageService) {
  }

  ngOnInit(): void {
    this.textFollowBtn = 'Follow';
    this.following = false;
    const snapshot: RouterStateSnapshot = this.router.routerState.snapshot;
    this.userService.getByID(snapshot.root.queryParams.userId).then(user => {
      this.user = user;

      this.isFollowing();
    });

    this.nootService.getNootsFromUser(snapshot.root.queryParams.userId).then(list => {
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

    isFollowing(): void {
      this.followService.getFollowing(this.storageService.user.getValue().id).then(following => {
        for (const u of following) {
          if (u === this.user.id) {
            this.textFollowBtn = 'unfollow';
            this.following = true;
            break;
          }
        }
      });
    }

  updateFollow(): void {
    if (this.following) {
      this.following = false;
      this.textFollowBtn = 'Follow';
      this.followService.unfollow(this.user.id);
    } else {
      this.following = true;
      this.textFollowBtn = 'Unfollow';
      this.followService.follow(this.user.id);
    }
  }
}
