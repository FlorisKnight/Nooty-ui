import { Component, OnInit } from '@angular/core';
import {Noot} from '../../_domain/Noot';
import {HashtagService} from '../../_services/hashtag.service';
import {NootService} from '../../_services/noot.service';
import {Hashtag} from '../../_domain/Hashtag';

@Component({
  selector: 'app-hashtags',
  templateUrl: './hashtags.component.html',
  styleUrls: ['./hashtags.component.scss']
})
export class HashtagsComponent implements OnInit {
  public noots: Array<Noot>;
  public hashtags: Array<Hashtag>;
  public searchInput: string;
  public hashtag: string;

  constructor(
    private hashtagService: HashtagService,
    private nootService: NootService
  ) {
    this.noots = [];
    this.hashtags = [];
    this.searchInput = '';
    this.hashtag = '';
  }

  ngOnInit(): void {
    this.hashtagService.getAllHashtags().then(list => {
      this.hashtags = list;
    });
  }

  public getNootsFromHashtag(id: string): void {
    this.noots = [];
    this.hashtagService.getNootIdFromHashtagId(id).then( list => {
      for (const n of list) {
        this.nootService.getNoot(n).then(noot => {
          this.noots.push(noot);
        });
        }
      }
    );
  }

  public searchHastag(): void {
    this.noots = [];
    this.changeHashtag('');
    if (this.searchInput !== '') {
      const input = this.searchInput.replace(/ /g, '').replace(/#/g, '')
      this.changeHashtag('#' + input);
      this.hashtagService.getNootIdFromHashtag(input).then(list => {
          for (const n of list) {
            this.nootService.getNoot(n).then(noot => {
              this.noots.push(noot);
            });
          }
        }
      );
    }
  }

  public changeHashtag(hashtag: string) {
    this.hashtag = hashtag;
  }
}
