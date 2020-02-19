import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
import { WebApiService } from './UI-Lose/Service/web-api.service';
import { FoundComponent } from './UI-Lose/_Losty/found/found.component';
import { EntryLoseComponent } from './UI-Lose/_Lose/entry-lose/entry-lose.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AgmCoreModule } from '@agm/core';
const ROUTES: Routes = [
  { path: "find", component: FindComponent },
  { path: "found", component: FoundComponent },
  { path: "lost-map", component: LostMapComponent },
  { path: "search", component: SearchComponent },
  { path: "lose", component: LoseComponent },
  { path: "losty", component: LostyComponent },
  { path: "private_area", component: EntryFindComponent }
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // DropDownsModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    // AlertModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCWXwfWSCnsonvPZobjIAaUHYIYU8MQUD0',
      language: 'he'
    }),
  ],
  // providers: [WebApiService,ImageService],
  providers: [WebApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
