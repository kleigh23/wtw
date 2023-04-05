import { Component, OnDestroy, OnInit } from '@angular/core';
import { Watching } from '../watching.model';
import { Subscription } from 'rxjs';
import { WatchingService } from '../watching.service';

@Component({
  selector: 'app-watching-list',
  templateUrl: './watching-list.component.html',
  styleUrls: ['./watching-list.component.css']
})
export class WatchingListComponent implements OnInit, OnDestroy {
  watchings: Watching[] = [];
  subscription: Subscription;
  term: string;

  constructor(private watchingService: WatchingService) {}

  ngOnInit() {
    this.watchingService.getWatchings();
    this.subscription = this.watchingService.watchingListChangedEvent
    .subscribe(
      (watchings: Watching[]) => {
        this.watchings = watchings;
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  search(value: string) {
    this.term = value;
  }
  
}
