import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideopageComponent } from './videopage/videopage.component';
import { SignupComponent } from './signup/signup.component';
import { ReloadComponent } from './reload/reload.component';
import { ClientInterfaceComponent } from './client-interface/client-interface.component';
import { MainClientComponent } from './main-client/main-client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SigninComponent } from './signin/signin.component';
import { MovetowhereComponent } from './movetowhere/movetowhere.component';
import { TestingCComponent } from './testing-c/testing-c.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    VideopageComponent,
    SignupComponent,
    SigninComponent,
    ReloadComponent,
    ClientInterfaceComponent,
    MainClientComponent,
    MovetowhereComponent,
    TestingCComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
