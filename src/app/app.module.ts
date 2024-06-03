import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from "@angular/common/http";

import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { ContentLayoutComponent } from "./layouts/content/content-layout.component";
import { FullLayoutComponent } from "./layouts/full/full-layout.component";
import { MatModule } from './appModules/mat.module';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { tokenInterceptor } from './shared/interceptors/token.interceptor';
import { errorInterceptor } from './shared/interceptors/error.interceptor';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';




@NgModule({
  declarations: [
    AppComponent,
    FullLayoutComponent,
    ContentLayoutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    MatModule
  ],
  
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    // {
    //   provide: HTTP_INTERCEPTORS, useClass: tokenInterceptor, multi: true
    // },
    // {
    //   provide: HTTP_INTERCEPTORS, useClass: errorInterceptor, multi: true
    // },
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 5000, verticalPosition: "top",
    horizontalPosition: "center"}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
