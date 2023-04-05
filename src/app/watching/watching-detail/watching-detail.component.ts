import { Component, OnInit } from '@angular/core';
import { Watching } from '../watching.model';
import { WatchingService } from '../watching.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-watching-detail',
  templateUrl: './watching-detail.component.html',
  styleUrls: ['./watching-detail.component.css']
})
export class WatchingDetailComponent implements OnInit {
  watching: Watching;
  id: string;

  constructor(private watchingService: WatchingService,
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.watching = this.watchingService.getWatching(this.id);
      }
    )
  }

  onDelete() {
    this.watchingService.deleteWatching(this.watching);
    this.router.navigateByUrl('/watchings')
  }
}
