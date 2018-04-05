import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
