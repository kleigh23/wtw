import { Component, OnInit } from '@angular/core';
import { WatchingService } from '../watching.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Watching } from '../watching.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-watching-edit',
  templateUrl: './watching-edit.component.html',
  styleUrls: ['./watching-edit.component.css']
})
export class WatchingEditComponent implements OnInit {
  originalWatching: Watching;
  watching: Watching;
  editMode: boolean = false;
  id: string;

  constructor(
    private watchingService: WatchingService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) =>{
      const id = params['id'];
      if (!id) {
        this.editMode = false;
        return;
      }
      this.originalWatching = this.watchingService.getWatching(id);
      if (!this.originalWatching) {
        return;
      }
      this.editMode = true;
      this.watching = JSON.parse(JSON.stringify(this.originalWatching));
      }
    ) 
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newWatching = new Watching(value.id, value.name, value.description, value.url);
    if(this.editMode){
      this.watchingService.updateWatching(this.originalWatching, newWatching);
    } else {
      this.watchingService.addWatching(newWatching);
    }
    this.router.navigate(['/watching']);
  }

  onCancel() {
    this.router.navigate(['/watchings']);
  }

  isInvalidWatching(newWatching: Watching) {
    if (!newWatching) { //New Contact has no value
      return true;
    }
    if (this.watching && newWatching.id === this.watching.id) {
      return true;
    }
    // for (let i = 0; i < this.groupContacts.length; i++) {
    //   if (newContact.id === this.groupContacts[i].id) {
    //     return true;
    //   }
    // }
    return false;
  }


}
