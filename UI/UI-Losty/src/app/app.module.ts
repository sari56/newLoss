import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './_Search/search/search.component';
import { SearchMapComponent } from './_Search/search-map/search-map.component';
import { FindComponent } from './_Find/find/find.component';
import { FoundComponent } from './_Find/found/found.component';
import { LoseComponent } from './_Lose/lose/lose.component';
import { LostyComponent } from './_Lose/losty/losty.component';
import { PersonalAreaComponent } from './_Personal_Area/personal-area/personal-area.component';
import { EditComponent } from './_Personal_Area/edit/edit.component';
import { ShowFoundsComponent } from './_Personal_Area/show-founds/show-founds.component';
import { ShowLossesComponent } from './_Personal_Area/show-losses/show-losses.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { WebApiService } from './Service/web-api.service';
// import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
// import { TooltipModule } from 'ngx-bootstrap/tooltip';
// import { ModalModule } from 'ngx-bootstrap/modal';
// import { AgmCoreModule } from '@agm/core';


const ROUTES:Routes=[
  { path: "find", component:FindComponent},
  { path: "found", component:FoundComponent},
  { path: "map", component:SearchMapComponent},
  { path: "search", component:SearchComponent},
  { path: "lose", component:LoseComponent},
  { path: "losty", component:LostyComponent},
  { path: "personal-area", component:PersonalAreaComponent},
  { path: "personal-area/show-founds", component:ShowFoundsComponent},
  { path: "personal-area/show-losses", component:ShowLossesComponent},
  { path: "personal-area/edit", component:EditComponent},
 ];

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    SearchMapComponent,
    FindComponent,
    FoundComponent,
    LoseComponent,
    LostyComponent,
    EditComponent,
    ShowFoundsComponent,
    ShowLossesComponent,
    PersonalAreaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // FormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES ,{useHash:true}),
    // BsDropdownModule.forRoot(),
    // TooltipModule.forRoot(),
    // ModalModule.forRoot(),
    // // AlertModule.forRoot(),
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyCWXwfWSCnsonvPZobjIAaUHYIYU8MQUD0',
    //   language:'he'
    // }),
  ],
  providers: [WebApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
