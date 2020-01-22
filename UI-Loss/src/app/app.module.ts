import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './UI-Lose/_Lose/search/search.component';
import { LoseComponent } from './UI-Lose/_Lose/lose/lose.component';
import { FindComponent } from './UI-Lose/_Find/find/find.component';
import { Routes, RouterModule } from '@angular/router';
import { FindDetailsComponent } from './UI-Lose/_Find/find-details/find-details.component';
import { LoseDetailsComponent } from './UI-Lose/_Lose/lose-details/lose-details.component';
import { EntryFindComponent } from './UI-Lose/_Find/entry-find/entry-find.component'; 
import { HttpClientModule } from '@angular/common/http';
import { LostMapComponent } from './UI-Lose/_Lose/lost-map/lost-map.component';
import { LostyComponent } from './UI-Lose/_Losty/losty/losty.component';
// import { ImageSnippetComponent } from './UI-Lose/_Losty/image-snippet/image-snippet.component';
import { WebApiService } from './UI-Lose/Service/web-api.service';
import { FoundComponent } from './UI-Lose/_Losty/found/found.component';
import { EntryLoseComponent } from './UI-Lose/_Lose/entry-lose/entry-lose.component';
// import { ImageService } from './UI-Lose/Service/image-service.service';
// import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AgmCoreModule } from '@agm/core';
import { PersonalAreaComponent } from './UI-Lose/PersonalArea/personal-area/personal-area.component';
import { PersonalFoundComponent } from './UI-Lose/PersonalArea/personal-found/personal-found.component';
import { PersonalLossComponent } from './UI-Lose/PersonalArea/personal-loss/personal-loss.component';
import { EditComponent } from './UI-Lose/PersonalArea/edit/edit.component';
import { MapComponent } from './UI-Lose/_Lose/map/map.component';

const ROUTES:Routes=[
  { path: "find", component:FindComponent},
  { path: "found", component:FoundComponent},
  { path: "lost-map", component:LostMapComponent},
  { path: "map", component:MapComponent},
  { path: "search", component:SearchComponent},
  { path: "lose", component:LoseComponent},
  { path: "losty", component:LostyComponent},
  { path: "private_area", component:EntryFindComponent},
  { path: "personal-area", component:PersonalAreaComponent},
  { path: "personal-area/personal-found", component:PersonalFoundComponent},
  { path: "personal-area/personal-loss", component:PersonalLossComponent},
  { path: "personal-area/edit", component:EditComponent},
  // { path: "",component:AppComponent },
  // { path: "**",component:AppComponent},
 ];
@NgModule({
  declarations: [
    AppComponent,
    FindComponent,
    LoseComponent,
    SearchComponent,
    FindDetailsComponent,
    LoseDetailsComponent,
    EntryFindComponent,
    LostMapComponent,
    LostyComponent,
    FoundComponent,
    EntryLoseComponent,
    PersonalAreaComponent,
    PersonalFoundComponent,
    PersonalLossComponent,
    EditComponent,
    MapComponent
    // ImageSnippetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // DropDownsModule,
    RouterModule.forRoot(ROUTES ,{useHash:true}),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    // AlertModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCWXwfWSCnsonvPZobjIAaUHYIYU8MQUD0',
      language:'he'
    }),
  ],
  // providers: [WebApiService,ImageService],
  providers: [WebApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
