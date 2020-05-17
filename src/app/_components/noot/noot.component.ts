import {Component, Input, OnInit} from '@angular/core';
import {Noot} from '../../_domain/Noot';
import {User} from '../../_domain/User';
import {UserService} from '../../_services/user.service';

@Component({
  selector: 'app-noot',
  templateUrl: './noot.component.html',
  styleUrls: ['./noot.component.scss']
})
export class NootComponent implements OnInit {
  @Input() noot: Noot;
  user: User;
  userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
  }

  ngOnInit(): void {
    this.userService.getByID(this.noot.userId).then(user => {
      this.user = user;
    });
  }

}
