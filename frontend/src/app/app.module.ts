import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { GeneralModule } from "./general/general.module";
import { AppRoutingModule } from './app-routing.module';
// services
import { AuthService } from './auth.service';
import { CustomHttpService } from "./custom-http.service";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    //routing module
    AppRoutingModule,
    //user defines modules
    GeneralModule,
  ],
  providers: [
    AuthService,
    CustomHttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
