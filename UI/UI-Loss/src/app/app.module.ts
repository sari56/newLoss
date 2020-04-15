import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FoundComponent } from './components/found/found.component';
import { LossComponent } from './components/loss/loss.component';
// import { SearchComponent } from './components/search/search.component';
import { MapComponent } from './components/map/map.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './search/search.component';
import { DataService } from './services/data.service';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { TableComponent } from './components/table/table.component';
import { PersonalAreaComponent } from './components/PersonalArea/personal-area/personal-area.component';
import { PersonalFoundComponent } from './components/PersonalArea/personal-found/personal-found.component';
import { PersonalLossComponent } from './components/PersonalArea/personal-loss/personal-loss.component';
import { EditComponent } from './components/PersonalArea/edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    FoundComponent,
    LossComponent,
    // SearchComponent,
    MapComponent,
    SearchComponent,
    TableComponent,
    PersonalAreaComponent,
    PersonalFoundComponent,
    PersonalLossComponent,
    EditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCWXwfWSCnsonvPZobjIAaUHYIYU8MQUD0',
      language:'he'
    }),
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
