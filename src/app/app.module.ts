import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { WatchingComponent } from './watching/watching.component';
import { WatchingDetailComponent } from './watching/watching-detail/watching-detail.component';
import { WatchingEditComponent } from './watching/watching-edit/watching-edit.component';
import { WatchingItemComponent } from './watching/watching-item/watching-item.component';
import { WatchingListComponent } from './watching/watching-list/watching-list.component';
import { WatchingsFilterPipe } from './watching/watchings-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WatchingComponent,
    WatchingDetailComponent,
    WatchingEditComponent,
    WatchingItemComponent,
    WatchingListComponent,
    WatchingsFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
