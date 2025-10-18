import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InviteComponent } from './invite/invite.component';
import { Invite2Component } from './invite2/invite2.component';
import { HomeComponent } from './home/home.component';
import { LightboxModule } from 'ngx-lightbox';



@NgModule({
  declarations: [
    AppComponent,
    InviteComponent,
    Invite2Component,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LightboxModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
