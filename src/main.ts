import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

import { provideFirebaseApp } from '@angular/fire/app';
import { provideAuth } from '@angular/fire/auth';
import { environment } from './environments/environment.prod';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { getAuth, initializeAuth, indexedDBLocalPersistence } from 'firebase/auth';
import { Capacitor } from '@capacitor/core';
import { getApp, getApps, initializeApp } from 'firebase/app';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    importProvidersFrom(HttpClientModule),

    provideFirebaseApp(() => initializeApp(environment.firebase)),

    provideAuth(() => {
      const app = getApps().length
        ? getApp()
        : initializeApp(environment.firebase);

      return Capacitor.isNativePlatform()
        ? initializeAuth(app, {
          persistence: indexedDBLocalPersistence
        })
        : getAuth(app);
    })
  ],
});
