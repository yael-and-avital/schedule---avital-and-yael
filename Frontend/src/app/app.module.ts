import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// Shared Module (Angular Material)
import { MaterialModule } from './shared/material/material.module';

// Interceptors
import { JwtInterceptor } from './interceptors/jwt.interceptor';

// Guards
import { AuthGuard } from './guards/auth.guard';

// Services
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // נדרש עבור Angular Material
    ReactiveFormsModule,     // טפסים ריאקטיביים
    HttpClientModule,        // קריאות HTTP לשרת
    AppRoutingModule,        // ניתובים
    MaterialModule           // מודול עיצוב עם כל רכיבי ה-Material
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
