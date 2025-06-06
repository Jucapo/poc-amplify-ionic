import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import {
  AmplifyAuthenticatorModule,
  AuthenticatorService,
} from '@aws-amplify/ui-angular';
import { AuthService } from './core/services/auth.service';
import {
  IonApp,
  IonRouterOutlet,
  IonButton,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonIcon,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonIcon,
    IonButtons,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonButton,
    IonRouterOutlet,
    IonApp,
    AmplifyAuthenticatorModule,
  ],
})
export class AppComponent implements OnInit {
  public isPrivacyRoute = false;

  constructor(
    public authenticator: AuthenticatorService,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    // Detectar cambios de ruta para exponer /privacy-policy sin login
    this.router.events
      .pipe(filter((evt) => evt instanceof NavigationEnd))
      .subscribe((evt: NavigationEnd) => {
        this.isPrivacyRoute = evt.urlAfterRedirects === '/privacy-policy';
      });

    // Monitorizar estado de autenticación
    this.checkAuthStatus();
    this.authenticator.subscribe(() => this.checkAuthStatus());
  }

  private async checkAuthStatus() {
    const status = await this.authenticator.authStatus;
    if (status === 'authenticated') {
      if (!this.isPrivacyRoute) {
        await this.redirectBasedOnRole();
      }
    } else {
      this.authService.clearCache();
      if (!this.isPrivacyRoute) {
        // Amplify sacará el login automáticamente
      }
    }
  }

  private async redirectBasedOnRole() {
    const role = await this.authService.getCurrentUserRole();
    if (role === 'admin') {
      // Si no está ya en /admin, lo enviamos ahí
      if (!this.router.url.startsWith('/admin')) {
        await this.router.navigate(['/admin']);
      }
    } else if (role === 'user') {
      // ENLACE a /tabs/dashboard – ojo: no a “/dashboard” suelto
      if (!this.router.url.startsWith('/tabs/dashboard')) {
        await this.router.navigate(['/tabs/dashboard']);
      }
    } else {
      // Rol desconocido → vuelvo a /
      await this.router.navigate(['/']);
    }
  }
}
