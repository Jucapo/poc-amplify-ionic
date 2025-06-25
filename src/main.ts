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

import { Amplify } from 'aws-amplify';
import '@aws-amplify/api-graphql'; // registra el provider de AppSync
import outputs from '../amplify_outputs.json';

import { addIcons } from 'ionicons';
import * as allIcons from 'ionicons/icons';
import './polyfills';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

// ————————————————————————————————————————————————————————
// 1) “Flatten” de tu JSON anidado al formato que Amplify v6 espera
const { auth, data, storage } = outputs;

const amplifyConfig = {
  // Región general y Cognito
  aws_project_region: auth.aws_region,
  aws_cognito_region: auth.aws_region,
  aws_user_pools_id: auth.user_pool_id,
  aws_user_pools_web_client_id: auth.user_pool_client_id,
  aws_cognito_identity_pool_id: auth.identity_pool_id,

  // AppSync / GraphQL
  aws_appsync_graphqlEndpoint: data.url,
  aws_appsync_region: data.aws_region,
  aws_appsync_authenticationType: data.default_authorization_type,
  aws_appsync_apiKey: data.api_key,

  // S3 Storage (user files)
  aws_user_files_s3_bucket: storage.bucket_name,
  aws_user_files_s3_bucket_region: storage.aws_region,

  // Si necesitas REST endpoints, podrías añadir aquí:
  // API: {
  //   REST: {
  //     miRestApi: {
  //       endpoint: 'https://...tu-endpoint...',
  //       region: auth.aws_region,
  //     }
  //   }
  // }
};

// 2) Configura Amplify con el objeto plano
Amplify.configure(amplifyConfig);
// ————————————————————————————————————————————————————————

addIcons(allIcons);
console.log('Amplify configured with:', {
  graphqlEndpoint: data.url,
  region: data.aws_region,
});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
}).catch((err) => console.error(err));
