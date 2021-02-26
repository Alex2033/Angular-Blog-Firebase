import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './shared/auth.guard';
import { SearchPipe } from './shared/search.pipe';
import { AlertComponent } from './shared/alert/alert.component';
import { AlertService } from './shared/alert.service';
import { QuillModule } from 'ngx-quill';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    QuillModule.forRoot(),
    RouterModule.forChild([
      {
        path: '',
        component: AdminLayoutComponent,
        children: [
          { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
          { path: 'login', component: LoginPageComponent },
          {
            path: 'dashboard',
            component: DashboardPageComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'create',
            component: CreatePageComponent,
            canActivate: [AuthGuard],
          },
          {
            path: 'post/:id/edit',
            component: EditPageComponent,
            canActivate: [AuthGuard],
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
  declarations: [
    AdminLayoutComponent,
    LoginPageComponent,
    DashboardPageComponent,
    CreatePageComponent,
    EditPageComponent,
    SearchPipe,
    AlertComponent,
  ],
  providers: [AuthGuard, AlertService],
})
export class AdminModule {}
