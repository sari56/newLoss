import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { FoundComponent } from './components/found/found.component';
import { LossComponent } from './components/loss/loss.component';
import { SearchComponent } from './search/search.component';
import { MapComponent } from './components/map/map.component';
import { HeaderComponent } from './components/header/header.component';
import { PersonalAreaComponent } from './components/PersonalArea/personal-area/personal-area.component';
import { PersonalFoundComponent } from './components/PersonalArea/personal-found/personal-found.component';
import { PersonalLossComponent } from './components/PersonalArea/personal-loss/personal-loss.component';
import { EditComponent } from './components/PersonalArea/edit/edit.component';
import { TableComponent } from './components/table/table.component';


const routes: Routes = [
  { path: 'login', component:LoginComponent},
  { path: 'home', component:HomeComponent},
  { path: 'header', component:HeaderComponent},
  { path: 'found', component:FoundComponent},
  { path: 'loss', component:LossComponent},
  { path: 'search', component:SearchComponent},
  { path: 'table', component:TableComponent},
  { path: 'search/table', component:TableComponent},
  { path: 'map', component:MapComponent},
  { path: 'personal-area', component:PersonalAreaComponent},
  { path: 'personal-area/personal-found', component:PersonalFoundComponent},
  { path: 'personal-area/personal-loss', component:PersonalLossComponent},
  { path: 'personal-area/edit', component:EditComponent},
  // { path: "", component:LoginComponent},
  // { path: "**", component:HomeComponent},
  { path: '', redirectTo: `login`, pathMatch: 'full' },
  { path: '**', redirectTo: `login`, pathMatch: 'full' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
