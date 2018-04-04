import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

// App Modules
import { AppSharedModule } from './app-shared.module';
import { AppRoutingModule } from './app-routing.module';

// App Components
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';

// Services
import { AdminService } from './services/admin.service';
import { ContactService } from './services/contact.service';
import { WindowRef } from './services/window-ref.service';
import { FullComponent } from './full/full.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FullComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppSharedModule,
    AppRoutingModule
  ],
  providers: [
    AdminService,
    ContactService,
    WindowRef
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
