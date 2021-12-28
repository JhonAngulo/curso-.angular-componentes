import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { QuicklinkModule } from 'ngx-quicklink';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import localesEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { TimeInterceptor } from './interceptor/time.interceptor'
import { TokenInterceptor } from './interceptor/token.interceptor';


registerLocaleData(localesEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    QuicklinkModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: LOCALE_ID, useValue: 'es'
  },
  {
    provide: HTTP_INTERCEPTORS, useClass: TimeInterceptor, multi: true
  },
  {
    provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
