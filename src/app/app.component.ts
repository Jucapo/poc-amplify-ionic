import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import {
  AmplifyAuthenticatorModule,
  AuthenticatorService,
} from '@aws-amplify/ui-angular';
import { AuthService } from './core/services/auth.service';

import {
  IonRouterOutlet,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonIcon,
  IonButtons,
  IonApp,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    IonApp,
    CommonModule,
    AmplifyAuthenticatorModule,
    IonRouterOutlet,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonIcon,
    IonButtons,
  ],
})
export class AppComponent implements OnInit {
  /** Será true cuando la ruta sea exactamente '/privacy-policy' */
  public isPrivacyRoute = false;

  constructor(
    public authenticator: AuthenticatorService,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    // 1) Detectar cambios de ruta para exponer /privacy-policy sin login
    this.router.events
      .pipe(filter((evt) => evt instanceof NavigationEnd))
      .subscribe((evt: NavigationEnd) => {
        this.isPrivacyRoute = evt.urlAfterRedirects === '/privacy-policy';
      });

    // 2) Monitorizar estado de autenticación
    this.checkAuthStatus();
    this.authenticator.subscribe(() => this.checkAuthStatus());
  }

  /** Comprueba si el usuario está autenticado y redirige según corresponda */
  private async checkAuthStatus() {
    const status = await this.authenticator.authStatus;

    if (status === 'authenticated') {
      // Si ya está dentro de /privacy-policy, no redirijo
      if (!this.isPrivacyRoute) {
        await this.redirectBasedOnRole();
      }
    } else {
      // No autenticado: limpio cache
      this.authService.clearCache();
      // Si no es la página pública, lo dejo caer al flujo de login
      if (!this.isPrivacyRoute) {
        // Amplify mostrará el login automáticamente vía <amplify-authenticator>
        // Si quisieras forzar navegación, podrías hacer:
        // await this.router.navigate(['/']);
      }
    }
  }

  /** Redirige a /admin o /tabs/dashboard según rol */
  private async redirectBasedOnRole() {
    const role = await this.authService.getCurrentUserRole();
    if (role === 'admin') {
      if (!this.router.url.startsWith('/admin')) {
        await this.router.navigate(['/admin']);
      }
    } else if (role === 'user') {
      if (!this.router.url.startsWith('/tabs/dashboard')) {
        await this.router.navigate(['/tabs/dashboard']);
      }
    } else {
      await this.router.navigate(['/']);
    }
  }
}
