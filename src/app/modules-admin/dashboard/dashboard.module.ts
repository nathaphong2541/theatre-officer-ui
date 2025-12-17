import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthErrorInterceptor } from 'src/app/core/guards/auth-error.interceptor';
import { TokenInterceptor } from 'src/app/core/guards/token.interceptor';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, DashboardRoutingModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthErrorInterceptor, multi: true },
  ]
})
export class DashboardModule { }
