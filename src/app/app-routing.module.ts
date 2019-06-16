import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Main
import { MainComponent } from './main/main.component';
import { FullComponent } from './full/full.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'full',
    component: FullComponent
  },
  {
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule'
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
