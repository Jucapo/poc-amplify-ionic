import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

import {
  AmplifyAuthenticatorModule,
  AuthenticatorService,
  translations,
} from '@aws-amplify/ui-angular';
import { I18n } from '@aws-amplify/core';
import { Amplify } from 'aws-amplify';

import awsExports from '../../amplify_outputs.json';
import { AuthService } from './core/services/auth.service';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [CommonModule, IonApp, IonRouterOutlet, AmplifyAuthenticatorModule],
})
export class AppComponent implements OnInit {
  public isPrivacyRoute = false;

  constructor(
    public authenticator: AuthenticatorService,
    private router: Router,
    private authService: AuthService,
  ) {
    // 1) Configurar Amplify
    Amplify.configure(awsExports);

    // 2) Cargar vocabularios originales de UI Angular
    I18n.putVocabularies(translations);

    // 3) Sobrescribir sólo las cadenas necesarias
    I18n.putVocabularies({
      es: {
        Email: 'Correo electrónico',
        'Enter your Email': 'Ingrese su correo',
        Password: 'Contraseña',
        'Enter your Password': 'Ingrese su contraseña',
        'Sign in': 'Ingresar',
        'Forgot your password?': 'Olvidé mi contraseña',
      },
    });

    // 4) Configurar el idioma por defecto
    I18n.setLanguage('es');
  }

  ngOnInit() {
    // Lógica de rutas y autenticación...
    this.router.events
      .pipe(filter((evt) => evt instanceof NavigationEnd))
      .subscribe((evt: NavigationEnd) => {
        this.isPrivacyRoute = evt.urlAfterRedirects === '/privacy-policy';
      });

    this.checkAuthStatus();
    this.authenticator.subscribe(() => this.checkAuthStatus());
  }

  private async checkAuthStatus() {
    const status = await this.authenticator.authStatus;
    if (status === 'authenticated') {
      if (!this.isPrivacyRoute) {
        await this.redirectBasedOnRole();
      }
    }
  }

  private async redirectBasedOnRole() {
    const role = await this.authService.getCurrentUserRole();

    if (role === 'admin') {
      if (!this.router.url.startsWith('/admin')) {
        await this.router.navigate(['/admin']);
      }
    } else {
      if (!this.router.url.startsWith('/tabs/dashboard')) {
        await this.router.navigate(['/tabs/dashboard']);
      }
    }
  }
}
