import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LangGuard } from './core/guards/lang.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { GuestGuard } from './core/guards/guest.guard';

const routes: Routes = [
  // root ให้ redirect ไป /th
  { path: '', redirectTo: 'th', pathMatch: 'full' },

  // locale wrapper
  {
    path: ':lang',
    canActivate: [LangGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules-admin/layout/layout.module').then((m) => m.LayoutModule),
      },
      {
        path: 'auth',
        canMatch: [GuestGuard],   // 👈 เพิ่มตรงนี้
        loadChildren: () =>
          import('./modules-admin/auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: 'errors',
        loadChildren: () =>
          import('./modules-admin/error/error.module').then((m) => m.ErrorModule),
      },
      { path: '**', redirectTo: 'errors/404' },
    ],
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled',
    scrollOffset: [0, 80], // เผื่อความสูง navbar (ปรับได้)
    onSameUrlNavigation: 'reload', // ให้เลื่อนซ้ำได้แม้อยู่หน้าเดิม
  })],
  exports: [RouterModule],

})
export class AppRoutingModule { }
