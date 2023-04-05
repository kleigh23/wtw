import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WatchingComponent } from './watching/watching.component';
import { WatchingEditComponent } from './watching/watching-edit/watching-edit.component';
import { WatchingDetailComponent } from './watching/watching-detail/watching-detail.component';

const routes: Routes = [
  {path: '', redirectTo: 'watching', pathMatch: 'full'},
  {path: 'watching', component: WatchingComponent, children: [
    {path: 'new', component: WatchingEditComponent},
    {path: ':id', component: WatchingDetailComponent},
    {path: ':id/edit', component: WatchingEditComponent},

]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
