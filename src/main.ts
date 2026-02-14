import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth } from '@angular/fire/auth';
import { environment } from './environments/environment.prod';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { getAuth, initializeAuth, indexedDBLocalPersistence } from 'firebase/auth';
import { Capacitor } from '@capacitor/core';
import { getApp } from 'firebase/app';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    importProvidersFrom(HttpClientModule),

    // ✅ Inicializa UMA VEZ
    provideFirebaseApp(() => initializeApp(environment.firebase)),

    // ✅ Usa a mesma instância
    provideAuth(() => {
      const app = getApp();

      return Capacitor.isNativePlatform()
        ? initializeAuth(app, {
          persistence: indexedDBLocalPersistence
        })
        : getAuth(app);
    })
  ],
}).catch(err => console.error(err));
