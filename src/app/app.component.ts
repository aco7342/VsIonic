import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen, Geolocation,Device,Network,BatteryStatus,BatteryStatusResponse } from 'ionic-native';
//import { StatusBar } from '@ionic-native/status-bar';
//import { SplashScreen } from '@ionic-native/splash-screen';

//import { Device } from '@ionic-native/device';
//import { Geolocation } from '@ionic-native/geolocation';
//import { BatteryStatus } from '@ionic-native/battery-status';

import { TabsPage } from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;
  networkType:string;
  Level:any = 0
  subscription : any;
  connectSubscription: any;
  isApp: boolean = true;
  constructor(platform: Platform) {
    if (platform.is('core') || platform.is('mobileweb')) {
       this.isApp = false;
    }
    platform.ready().then((source) => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      console.log('app.components.ts.25 isApp:', this.isApp , ' source:' , source);
      StatusBar.styleDefault();
      Splashscreen.hide();
      console.log('app.components.ts.28');
      

      this.networkType ='(none)';
      this.connectSubscription = Network.onConnect().subscribe(() => {
         this.networkType = Network.type;
         console.log('app.components.ts.35 Net:'+this.networkType);
      });

      /*
      this.subscription = BatteryStatus.onChange().subscribe(
        (status) => {
          this.Level = status.level;
          console.log('app.components.ts.38 Battery:',status.level, status.isPlugged); 
          console.log(status.level, status.isPlugged);
        }
      );*/
      
      this.subscription = BatteryStatus.onChange().subscribe(
        (status: BatteryStatusResponse) => {
            this.Level = status.level
            console.log(status.level, status.isPlugged);
        }
      );

      //console.log(device.uuid);
      //console.dir(Device);
      //console.log('UUid:',Device.uuid);
	  
         Geolocation.getCurrentPosition().then((pos) => {
            console.log('app.components.ts.30 lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
         }).catch((error) => {
            console.log('Error getting location', error);
         });

      if (/*Device.uuid*/this.isApp){

         console.log('app.components.45 Device UUid:',Device.uuid);
         console.log('app.components.46 Device cordova is: ' + Device.cordova);
         console.log('app.components.47 Device model is: ' + Device.model);
         console.log('app.components.48 Device platform is: ' + Device.platform);
         console.log('app.components.49 Device OS version is: ' + Device.version);
         console.log('app.components.50 Device manufacturer is: ' + Device.manufacturer);
         console.log('app.components.51 Device serial is: ' + Device.serial);
         console.log('app.components.52 Device isVirtual: ' + Device.isVirtual);
         
      } else {
         console.log('app.components.55.UUid:','Simulator'); 
      }
    });
  }
}
