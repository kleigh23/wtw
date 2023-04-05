import { EventEmitter, Injectable } from '@angular/core';
import { Watching } from './watching.model';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WatchingService {
  watchingSelectedEvent = new EventEmitter<Watching>();
  watchingChangedEvent = new EventEmitter<Watching[]>();
  watchingListChangedEvent = new Subject<Watching[]>();
  watchings: Watching[] = [];
  maxWatchingId: number;

  constructor(private http: HttpClient) { 
    this.maxWatchingId = this.getMaxId();
  }

  getWatchings() {
    this.http.get<Watching[]>('http://localhost:3000/watching')
    .subscribe(
      //success method
      (watchings: Watching[]) => {
        this.watchings = watchings
        this.maxWatchingId = this.getMaxId();
        this.watchings.sort();
        this.watchingListChangedEvent.next(this.watchings.slice());
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  storeWacthings(watchings: Watching) {
    const watchingString = JSON.stringify(this.watchings);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.getWatchings();
    this.http
    .put('https://cms-semester-project-default-rtdb.firebaseio.com/contacts.json', watchingString, { headers })
    .subscribe(
      (response) => {
        this.watchingListChangedEvent.next(this.watchings.slice()), response;
      },
      (error) => {
        console.log('Error saving movie or show: ', error);
      }
    );
  }

  getWatching(id: string): Watching {
    for (let watching of this.watchings) {
      if (watching.id == id) {
        return watching;
      } 
    }
    return null!;
  }

  getMaxId(): number {
    let maxId = 0

    for (let watching of this.watchings) {
      let id = +watching.id;
      if (id > maxId) {
        maxId = id
      }
    }
    return maxId
  }

  addWatching(watching: Watching) {
    if (!watching) {
      return;
    }
  
    // make sure id of the new movie or show is empty
    watching.id = '';
  
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
  
    // add to database
    this.http.post<{ message: string, watching: Watching }>('http://localhost:3000/watching',
      watching,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new watching to watchings
          this.watchings.push(responseData.watching);
          this.sortAndSend();
        }
      );
  }

  updateWatching(originalWatching: Watching, newWatching: Watching) {
    if (!originalWatching || !newWatching) {
      return;
    }

    const pos = this.watchings.findIndex(d => d.id === originalWatching.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new watching to the id of the old watching
    newWatching.id = originalWatching.id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/watching/' + originalWatching.id,
      newWatching, { headers: headers })
      .subscribe(
        (watchings) => {
          this.watchings[pos] = newWatching;
          this.sortAndSend();
        }
      );
  }

  deleteWatching(watching: Watching) {

    if (!watching) {
      return;
    }

    const pos = this.watchings.findIndex(d => d.id === watching.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/watching/' + watching.id)
      .subscribe(
        (watching) => {
          this.watchings.splice(pos, 1);
          this.sortAndSend();
        }
      );
  }

  sortAndSend(){
    this.watchings.sort((a,b)=>{
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });
    this.watchingListChangedEvent.next(this.watchings.slice())
  }

}


