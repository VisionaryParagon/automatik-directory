import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatInputModule,
  MatProgressSpinnerModule
} from '@angular/material';

import { CookieModule } from 'ngx-cookie';

// Pipes
import { TelPipe } from './pipes/tel.pipe';
import { BdayPipe } from './pipes/bday.pipe';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatProgressSpinnerModule,
    CookieModule.forRoot()
  ],
  declarations: [
    TelPipe,
    BdayPipe
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatProgressSpinnerModule,
    CookieModule,
    TelPipe,
    BdayPipe
  ]
})
export class AppSharedModule { }
