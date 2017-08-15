import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen, Geolocation,Device,Network,BatteryStatus } from 'ionic-native';
//import { ScreenOrientation } from 'ionic-native'; //http://ionic168.rssing.com/chan-53730660/all_p933.html
//import { ScreenOrientation } from '@ionic-native/screen-orientation';
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
  isApp: boolean = true;
  Device : any;
  Coord : any;
  connectSubscription : any;
  subscription : any;
  constructor(platform: Platform /*, public screenOrientation: ScreenOrientation*/) {
    if (platform.is('core') || platform.is('mobileweb')) {
       this.isApp = false;
    }
    localStorage.setItem('isApp', this.isApp ? '1' : '0');
    platform.ready().then((source) => {
      //ScreenOrientation.lockOrientation('portrait');
      //ScreenOrientation.lockOrientation('landscape');
      //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);

      console.log('app.components.ts.33 isApp:', this.isApp , ' source:' , source);
      StatusBar.styleDefault();
      Splashscreen.hide();
      console.log('app.components.ts.36');

      this.networkType ='(none)';
      localStorage.setItem('rede', this.networkType);

      this.Coord = { latitude:-23.5498723  , longitude:-46.6361756 } ; //-23.5498723,-46.6361756
      let position = JSON.stringify(this.Coord);
      console.log('app.components.ts.57 position ' + position);
      localStorage.setItem('coord', position);
      Geolocation.getCurrentPosition().then((pos) => {
        let meupos = pos.coords;
        //console.dir(meupos);
        this.Coord = { latitude: meupos.latitude , longitude: meupos.longitude };
        position = JSON.stringify(this.Coord);
        console.log('app.components.ts.64 position ' + position);
        localStorage.setItem('coord', position );
        this.Coord = pos.coords;
      }).catch((error) => {
         console.log('Error getting location', error);
      });
      if (/*Device.uuid*/this.isApp){
         this.Device = Device;
         localStorage.setItem('device', JSON.stringify(this.Device));
         console.log('app.components.72 Device UUid:'+Device.uuid);
         console.log('app.components.73 Device cordova is: ' + Device.cordova);
         console.log('app.components.74 Device model is: ' + Device.model);
         console.log('app.components.75 Device platform is: ' + Device.platform);
         console.log('app.components.76 Device OS version is: ' + Device.version);
         console.log('app.components.77 Device manufacturer is: ' + Device.manufacturer);
         console.log('app.components.78 Device serial is: ' + Device.serial);
         console.log('app.components.79 Device isVirtual: ' + Device.isVirtual);
         
      } else {
         console.log('app.components.82.UUid:','Simulator'); 
      }
    });
  }
  
  ionViewWillEnter() {
      console.log('app.components.80 ionViewWillEnter ' );
      this.connectSubscription = Network.onConnect().subscribe(() => {
         this.networkType = Network.type;
         console.log('app.components.ts.89 Network:'+this.networkType);
         localStorage.setItem('rede', this.networkType);
      });
      this.subscription = BatteryStatus.onChange().subscribe(
        (status) => {
            this.Level = status.level;
            console.log('app.components.ts.90 battery level:', status.level, ' isPlugged:' , status.isPlugged);
            localStorage.setItem('bateria', JSON.stringify(status));
        }
      );
  }
 
  ionViewWillLeave() {
    console.log('app.components.96 ionViewWillLeave ' );    
    this.subscription.unsubscribe(); 
    this.connectSubscription.unsubscribe(); 
  }
}
