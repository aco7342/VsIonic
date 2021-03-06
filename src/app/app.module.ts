import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { NuvemPage } from '../pages/nuvem/nuvem';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { AuthService } from '../providers/auth-service';

//import { StatusBar, Splashscreen, Geolocation,Device,Network,BatteryStatus,BatteryStatusResponse } from 'ionic-native';

//import { StatusBar, Splashscreen, Geolocation,Device,Network,BatteryStatus } from 'ionic-native';
//import { GoogleMap, GoogleMapsEvent, GoogleMapsMarker, GoogleMapsLatLng} from 'ionic-native';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    NuvemPage,
    TabsPage,
    LoginPage,
    RegisterPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    NuvemPage,
    TabsPage,
    LoginPage,
    RegisterPage
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService
    //,StatusBar,
    //Splashscreen,
    //BatteryStatus,
    //GoogleMap,
    //GoogleMapsEvent,
    //GoogleMapsMarker,
    //GoogleMapsLatLng,
    //Geolocation,
    //Device,
    //Network
    ]
})
export class AppModule {}
