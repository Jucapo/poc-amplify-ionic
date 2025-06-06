// src/main.ts

import { bootstrapApplication } from '@angular/platform-browser';
import { isDevMode } from '@angular/core';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

import { provideServiceWorker } from '@angular/service-worker';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';

import { addIcons } from 'ionicons';
import * as allIcons from 'ionicons/icons';
import './polyfills';

// Configurar AWS Amplify
Amplify.configure(outputs);

// Agregar todos los iconos de Ionicons
addIcons(allIcons);

// Verificar la configuración de Amplify en consola
console.log('Amplify configured with:', {
  endpoint: outputs.data.url,
  region: outputs.data.aws_region,
});

bootstrapApplication(AppComponent, {
  providers: [
    // Estrategia de reutilización de rutas para Ionic
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    // Proveedores de Ionic
    provideIonicAngular(),

    // Configurar el router con precarga de módulos
    provideRouter(routes, withPreloading(PreloadAllModules)),

    // Registrar el Service Worker en producción (no en dev)
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
}).catch((err) => console.error(err));
