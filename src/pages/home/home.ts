import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { NavController, App, LoadingController, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';

//import * as $ from "jquery";

//https://x-team.com/blog/include-javascript-libraries-in-an-ionic-2-typescript-project/

declare var  Hls: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  loading: any;
  isLoggedIn: boolean = false;
  platformList: string = '';
  isApp: boolean = true;
  subscription : any;
  subscriptionCritical : any;
  subscriptionLow : any;
  nav : any;

  constructor(public app: App, public navCtrl: NavController, public authService: AuthService, public loadingCtrl: LoadingController, private toastCtrl: ToastController, public platform: Platform/*, public device: Device , public geolocation: Geolocation,public batteryStatus: BatteryStatus*/) {
    this.nav = navCtrl; //https://stackoverflow.com/questions/36723830/ionic2-check-if-page-is-active
    console.log( 'HomePage is active ',  this.nav.root.name == "HomePage" );
    let platforms = this.platform.platforms();
    this.platformList = platforms.join(', ');

    if (this.platform.is('core') || this.platform.is('mobileweb')) {
        this.isApp = false;
    }

    function suspendvideo(){
    }

    platform.ready().then((source) => {
      if(localStorage.getItem("token")) {
          this.isLoggedIn = true;
      } else {
          this.isLoggedIn = false;
      }

      console.log('home.ts.67 ' + this.platformList + ' ' + this.isApp , ' source:' , source , ' HomePage is active ',  this.nav.root.name == "HomePage" , 'is Logged?' , this.isLoggedIn);
      if ((this.nav.root.name == "HomePage") && (this.isLoggedIn) ){
         meuvideo('video1','http://playertest.longtailvideo.com/adaptive/wowzaid3/playlist.m3u8');
         meuvideo('video2','http://playertest.longtailvideo.com/adaptive/oceans_aes/oceans_aes.m3u8');
         meuvideo('video3','http://playertest.longtailvideo.com/adaptive/wowzaid3/playlist.m3u8');
         meuvideo('video4','http://playertest.longtailvideo.com/adaptive/oceans_aes/oceans_aes.m3u8');

      } else {
          suspendvideo();
      }
    });

    function meuvideo(videoId , videoUrl){
                            let NewVideoId = '#'+ videoId;
                            console.log('home.ts.78 meuvideo()',videoId,' ',NewVideoId );
                            if(Hls.isSupported()) { //https://github.com/video-dev/hls.js/tree/master
                                let video : HTMLMediaElement = <HTMLMediaElement> document.getElementById(videoId);
                                let hls = new Hls(); //http://playertest.longtailvideo.com/adaptive/bipbop/bipbopall.m3u8
                                console.log('home.ts.97.hls.video.play() video.readyStare:',video.readyState);
                                hls.loadSource(videoUrl);
                                hls.attachMedia(video);
                                hls.on(Hls.Events.MANIFEST_PARSED,function() {
                                    video.play();
                                    video.muted = true;
                                    console.log('home.ts.103. video[0].play();');
                                });
                            } else {
                                    console.log('home.ts.106.hls.is not supported');
                            }
    }
  }

  logout() {
    var token = localStorage.getItem("token");
    console.log('home.ts.113 logout: ' + JSON.stringify(logoutData) );
    //this.showLoader();
    if (token) {
        var logoutData = { sessionId : token };
        this.authService.logout(logoutData).then((result) => {
          console.log('home.ts.118 result: ' + result  + ' ' + JSON.stringify(logoutData) );
          //this.loading.dismiss();
          localStorage.clear();
          this.isLoggedIn = false;
          this.navCtrl.setRoot(LoginPage);
        }, (err) => {
          //this.loading.dismiss();
          console.log('home.ts.126 logout err: ' + err  );
          this.presentToast(err);
        });
    } else {
        this.navCtrl.setRoot(LoginPage);
    }
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: '(home.ts Authenticating...'
    });

    this.loading.present();
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
