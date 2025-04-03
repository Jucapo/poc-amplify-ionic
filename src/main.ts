import { bootstrapApplication } from '@angular/platform-browser';
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

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

import { Amplify } from 'aws-amplify';
import outputs from '../amplify_outputs.json';

import { addIcons } from 'ionicons';
import * as allIcons from 'ionicons/icons';

Amplify.configure(outputs);

addIcons(allIcons);

// Verify configuration
console.log('Amplify configured with:', {
  endpoint: outputs.data.url,
  region: outputs.data.aws_region,
});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
