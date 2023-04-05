import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Watching } from '../watching.model';

@Component({
  selector: 'app-watching-item',
  templateUrl: './watching-item.component.html',
  styleUrls: ['./watching-item.component.css']
})
export class WatchingItemComponent implements OnInit{
  @Input()watching: Watching;
  @Output() watchingSelected = new EventEmitter<void>();

  constructor() {}

  ngOnInit() {
    
  }

  onSelected() {
    this.watchingSelected.emit();
  }


}
