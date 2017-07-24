import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { NavController, App, LoadingController, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
//import { ScreenOrientation } from 'ionic-native';

//import * as $ from "jquery";

//https://x-team.com/blog/include-javascript-libraries-in-an-ionic-2-typescript-project/

declare var  Hls: any;

@Component({
  selector: 'nuvem-home',
  templateUrl: 'nuvem.html'
})
export class NuvemPage {
  loading: any;
  isLoggedIn: boolean = false;
  platformList: string = '';
  isApp: boolean = true;
  subscription : any;
  subscriptionCritical : any;
  subscriptionLow : any;
  nav : any;
  _app : any;
  
//  vetor : any[] = []; //https://stackoverflow.com/questions/16233266/arrays-in-type-script
                      //var bks: Book[] = [];

  constructor(public app: App, public navCtrl: NavController, public authService: AuthService, public loadingCtrl: LoadingController, private toastCtrl: ToastController, public platform: Platform/*, public device: Device , public geolocation: Geolocation,public batteryStatus: BatteryStatus*/) {
    this.nav = navCtrl; //https://stackoverflow.com/questions/36723830/ionic2-check-if-page-is-active
    this._app = app;
    console.log( 'NuvemPage is active ',  this.nav.root.name == "NuvemPage" );
    let platforms = this.platform.platforms();
    this.platformList = platforms.join(', ');

    if (this.platform.is('core') || this.platform.is('mobileweb')) {
        this.isApp = false;
    }

    function suspendvideo(){
    }

    platform.ready().then((source) => {
        
      //ScreenOrientation.lockOrientation('portrait');
//    ScreenOrientation.lockOrientation('landscape');
        
      if(localStorage.getItem("token")) {
          this.isLoggedIn = true;
      } else {
          this.isLoggedIn = false;
      }

      console.log('nuvem.ts.54 ' + this.platformList + ' isApp: ' + this.isApp , ' source:' , source , ' NuvemPage is active ',  this.nav.root.name == "NuvemPage" , 'is Logged?' , this.isLoggedIn);
      if ((this.nav.root.name == "NuvemPage") && (this.isLoggedIn) ){
          
  //       for ( let i=0; i < this.vetor.length ; i++)
  //           this.vetor.pop();
         
         meuvideo('video1','http://playertest.longtailvideo.com/adaptive/wowzaid3/playlist.m3u8');
         meuvideo('video2','http://playertest.longtailvideo.com/adaptive/oceans_aes/oceans_aes.m3u8');
         meuvideo('video3','http://playertest.longtailvideo.com/adaptive/wowzaid3/playlist.m3u8');
         meuvideo('video4','http://playertest.longtailvideo.com/adaptive/oceans_aes/oceans_aes.m3u8');
         
         meuvideo('video5','http://playertest.longtailvideo.com/adaptive/wowzaid3/playlist.m3u8');
         meuvideo('video6','http://playertest.longtailvideo.com/adaptive/oceans_aes/oceans_aes.m3u8');
         meuvideo('video7','http://playertest.longtailvideo.com/adaptive/wowzaid3/playlist.m3u8');
         meuvideo('video8','http://playertest.longtailvideo.com/adaptive/oceans_aes/oceans_aes.m3u8');
         

      } else {
          suspendvideo();
      }
    });

    function meuvideo(videoId , videoUrl){
                            let NewVideoId = '#'+ videoId;
                            console.log('nuvem.ts.68 meuvideo()',videoId,' ',NewVideoId );
                            if(Hls.isSupported()) { //https://github.com/video-dev/hls.js/tree/master
                                let video : HTMLMediaElement = <HTMLMediaElement> document.getElementById(videoId);
                                let hls = new Hls(); //http://playertest.longtailvideo.com/adaptive/bipbop/bipbopall.m3u8
                                //this.vetor.push( new Hls() ); //bks.push(new Book());
                                console.log('nuvem.ts.72.hls.video.play() ');
                                hls.loadSource(videoUrl);                     /* this.vetor[ this.vetor.length ].loadSource(videoUrl);  //*/
                                hls.attachMedia(video);                       /* this.vetor[ this.vetor.length ].attachMedia(video) //*/
                                hls.on(Hls.Events.MANIFEST_PARSED,function() {/* this.vetor[ this.vetor.length ].on(Hls.Events.MANIFEST_PARSED,function() {  //*/
                                    video.play();
                                    video.muted = true;
                                    console.log('nuvem.ts.83. video[0].play();');
                                });
                            } else {
                                    console.log('nuvem.ts.86.hls.is not supported');
                            }
    }
  }

  logout() {
    var token = localStorage.getItem("token");
    console.log('nuvem.ts.93 logout: ' + JSON.stringify(logoutData) );
    //document.querySelector("ion-tabbar").style.display = 'none';
    //document.querySelector('#tabs ion-tabbar-section')['style'].display = 'none';
    //this.showLoader();
    if (token) {
        var logoutData = { sessionId : token };
        this.authService.logout(logoutData).then((result) => {
          console.log('nuvem.ts.98 result: ' + result  + ' ' + JSON.stringify(logoutData) );
          //this.loading.dismiss();
          localStorage.clear();
          this.isLoggedIn = false;
          //this.navCtrl.setRoot(LoginPage);
          this._app.getRootNav().setRoot(LoginPage);
        }, (err) => {
          //this.loading.dismiss();
          console.log('nuvem.ts.105 logout err: ' + err  );
          this.presentToast(err);
        });
    } else {
        this.isLoggedIn = false;
        console.log('nuvem.ts.113 ');
        //this.navCtrl.setRoot(LoginPage);
        this._app.getRootNav().setRoot(LoginPage);
    }
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: '(nuvem.ts Authenticating...'
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
