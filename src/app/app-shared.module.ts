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
import { SortPipe } from './pipes/sort.pipe';
import { TelPipe } from './pipes/tel.pipe';

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
    SortPipe,
    TelPipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatProgressSpinnerModule,
    CookieModule,
    SortPipe,
    TelPipe
  ]
})
export class AppSharedModule { }
