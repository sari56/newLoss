import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { FoundComponent } from './components/found/found.component';
import { LossComponent } from './components/loss/loss.component';
import { SearchComponent } from './search/search.component';
import { MapComponent } from './components/map/map.component';
import { HeaderComponent } from './components/header/header.component';


const routes: Routes = [
  { path: "home", component:HomeComponent},
  { path: "header", component:HeaderComponent},
  { path: "found", component:FoundComponent},
  { path: "loss", component:LossComponent},
  { path: "search", component:SearchComponent},
  { path: "map", component:MapComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
