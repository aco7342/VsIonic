import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { NavController, App, LoadingController, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
//import { ScreenOrientation } from 'ionic-native';

//import * as $ from "jquery";

//https://x-team.com/blog/include-javascript-libraries-in-an-ionic-2-typescript-project/

declare var  Hls: any;

let vetor : any = [];
let idexterno = '';
let wsLogin:boolean = false;
let nr : number = 0;

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
  _app : any;

  constructor(public app: App, public navCtrl: NavController, public authService: AuthService, public loadingCtrl: LoadingController, private toastCtrl: ToastController, public platform: Platform/*, public device: Device , public geolocation: Geolocation,public batteryStatus: BatteryStatus*/) {
    this.nav = navCtrl; //https://stackoverflow.com/questions/36723830/ionic2-check-if-page-is-active
    this._app = app;
    console.log( 'HomePage is active ',  this.nav.root.name == "HomePage" );
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

      console.log('home.ts.62 ' + this.platformList + ' isApp: ' + this.isApp , ' source:' , source , ' HomePage is active ',  this.nav.root.name == "HomePage" , 'is Logged?' , this.isLoggedIn);
      if ((this.nav.root.name == "HomePage") && (this.isLoggedIn) ){
         //let data = JSON.parse( localStorage.getItem("data") ) ;
         //for(let x=0; x < 2; x++) {
         //}
         meuvideo('video1','http://playertest.longtailvideo.com/adaptive/wowzaid3/playlist.m3u8');
         meuvideo('video2','http://playertest.longtailvideo.com/adaptive/oceans_aes/oceans_aes.m3u8');
         
         let _data = JSON.parse( localStorage.getItem("data") ) ;
         let apiWs = 'ws://192.168.1.34:1880/ws/simple' ;
         apiWs = 'ws://localhost:1880/ws/simple' ;
         
         if (_data)
             idexterno = _data.usuarios.idexterno;
         console.log('ws0');
         let ws = new WebSocket( apiWs , []);
         console.log('ws1');
         // Set the function to be called when a message is received.
         ws.onopen = () => {
           console.log('open');
           wsLogin = true;
         };

         ws.onmessage = (event) => {
           console.log('new message: ' + event.data);
           localStorage.setItem('ws', JSON.stringify(event.data));
           ws.send('abCdEfg..'+ (nr++) );
         };

         ws.onerror = () => {
           console.log('error occurred!');
         };

         ws.onclose = (event) => {
           wsLogin = false;
           console.log('close code=' + event.code);
         };

      } else {
          suspendvideo();
      }
    });

    function meuvideo(videoId , videoUrl){
                            let NewVideoId = '#'+ videoId;
                            console.log('home.ts.68 meuvideo()',videoId,' ',NewVideoId );
                            if(Hls.isSupported()) { //https://github.com/video-dev/hls.js/tree/master
                                let video : HTMLMediaElement = <HTMLMediaElement> document.getElementById(videoId);
                                let hls = new Hls(); //http://playertest.longtailvideo.com/adaptive/bipbop/bipbopall.m3u8
                                console.log('home.ts.72.hls.video.play() ');
                                hls.loadSource(videoUrl);                     
                                hls.attachMedia(video);                       
                                console.log( hls );
                                console.dir( hls );
                                //console.log( JSON.stringify(hls)) ;
                                hls.on(Hls.Events.MANIFEST_PARSED,function() {
                                    video.play();
                                    video.muted = true;
                                    console.log('home.ts.83. video[0].play() elem:' , this.elem);
                                });
                                
                                /* let hls = new Hls(); //http://playertest.longtailvideo.com/adaptive/bipbop/bipbopall.m3u8
                                console.log('home.ts.72.hls.video.play() ', this.elem++);
                                hls.loadSource(videoUrl);                     
                                hls.attachMedia(video);                       
                                hls.on(Hls.Events.MANIFEST_PARSED,function() {
                                    video.play();
                                    video.muted = true;
                                    console.log('home.ts.83. video[0].play() elem:' , this.elem);
                                }); */

                                
                            } else {
                                    console.log('home.ts.86.hls.is not supported');
                            }
    }
  }

  logout() {
    var token = localStorage.getItem("token");
    console.log('home.ts.93 logout: ' + JSON.stringify(logoutData) );
    //this.showLoader();
    if (token) {
        var logoutData = { sessionId : token };
        this.authService.logout(logoutData).then((result) => {
          console.log('home.ts.98 result: ' + result  + ' ' + JSON.stringify(logoutData) );
          //this.loading.dismiss();
          localStorage.clear();
          this.isLoggedIn = false;
          //this.navCtrl.setRoot(LoginPage);
          this._app.getRootNav().setRoot(LoginPage);
        }, (err) => {
          //this.loading.dismiss();
          console.log('home.ts.105 logout err: ' + err  );
          this.presentToast(err);
        });
    } else {
        this.isLoggedIn = false;
        console.log('home.ts.113 ');
        //this.navCtrl.setRoot(LoginPage);
        this._app.getRootNav().setRoot(LoginPage);
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
