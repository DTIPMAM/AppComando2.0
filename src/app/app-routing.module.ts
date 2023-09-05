import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlobalErrorComponent } from './errors/global-error/global-error.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { LoginAuthGuard } from './services/auth/login-auth.guard';
import { RoutesAuthGuard } from './services/auth/routes-auth.guard';
import * as path from "path";
import {HomeComponent} from "./home/home.component";
import {IdentidadeDigitalComponent} from "./modules/identidade-digital/identidade-digital.component";

const routes: Routes = [
  {
    path: '',
    title: 'App Comando',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then((m) => m.LoginModule),
    canActivate: [LoginAuthGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    canActivate: [RoutesAuthGuard]
  },
  {
    path: 'home',
    children: [
      {
        path: '',
        title: 'Home',
        component: HomeComponent
      },
      {
        path: 'identidade-digital',
        title: 'Identidade',
        component: IdentidadeDigitalComponent
      }
    ]
  },
  {
    path: 'error',
    title: 'App Comando - Error',
    component: GlobalErrorComponent,
    canActivate: [RoutesAuthGuard]
  },
  {
    path: '**',
    title: 'Página Não Encontrada',
    component: NotFoundComponent,
    canActivate: [RoutesAuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
