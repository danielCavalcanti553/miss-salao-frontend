import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { importProvidersFrom, inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

import { provideFirebaseApp, initializeApp, FirebaseApp } from '@angular/fire/app';
import { provideAuth } from '@angular/fire/auth';
import { environment } from './environments/environment.prod';

import { Capacitor } from '@capacitor/core';
import { getAuth, initializeAuth, inMemoryPersistence } from 'firebase/auth';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    importProvidersFrom(HttpClientModule),

    provideFirebaseApp(() => initializeApp(environment.firebase)),

    provideAuth(() => {
      const app = inject(FirebaseApp);

      if (Capacitor.isNativePlatform()) {
        return initializeAuth(app, { persistence: inMemoryPersistence });
      }

      return getAuth(app);
    }),
  ],
}).catch(err => console.error(err));
