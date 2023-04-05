import { Component, OnInit } from '@angular/core';
import { Watching } from './watching.model';
import { WatchingService } from './watching.service';

@Component({
  selector: 'app-watching',
  templateUrl: './watching.component.html',
  styleUrls: ['./watching.component.css'],
  providers: [WatchingService]
})
export class WatchingComponent implements OnInit {
  selectedWatching: Watching;

  constructor(private watchingService: WatchingService) {}

  ngOnInit() {
    this.watchingService.watchingSelectedEvent.subscribe(
      (watching: Watching) => {
        this.selectedWatching = watching;
      }
    )
  }
}

