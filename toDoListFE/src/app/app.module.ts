import { DatePipe } from '@angular/common';
import { NgModule, provideZoneChangeDetection } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

@NgModule({
  imports: [FormsModule],
  providers: [
    DatePipe,
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
  ],
})
export class AppModule {}
