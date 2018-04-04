import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatInputModule,
  MatProgressSpinnerModule
} from '@angular/material';

import { CookieModule } from 'ngx-cookie';
import { OrderModule } from 'ngx-order-pipe';

// Pipes
import { SortPipe } from './pipes/sort.pipe';
import { TelPipe } from './pipes/tel.pipe';
import { BdayPipe } from './pipes/bday.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatProgressSpinnerModule,
    CookieModule.forRoot(),
    OrderModule
  ],
  declarations: [
    SortPipe,
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
    OrderModule,
    SortPipe,
    TelPipe,
    BdayPipe
  ]
})
export class AppSharedModule { }
