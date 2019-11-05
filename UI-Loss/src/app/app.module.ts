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
// import { ImageService } from './UI-Lose/Service/image-service.service';

 

const ROUTES:Routes=[
  { path: "find",component:EntryFindComponent},
  { path: "lose",component:LoseComponent},
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
    // ImageSnippetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES ,{useHash:true})
  ],
  // providers: [WebApiService,ImageService],
  providers: [WebApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }