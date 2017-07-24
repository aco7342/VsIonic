import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, App } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  loading: any;
  loginData = { username:'', password:'' };
  data: any;
  nav : any;
  tabBarElement : any;
  //tabBarElement: Element;
  constructor(public navCtrl: NavController, public authService: AuthService, public loadingCtrl: LoadingController, private toastCtrl: ToastController,public app: App) {
    this.nav = navCtrl;
    console.log('login.ts.21');
    console.log( 'LoginPage is active ',  this.nav.root.name == "LoginPage" );  
    if (document.querySelector('.tabbar')) {
        this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    }
  }
  
  ionViewWillEnter() {
      console.log('login.ts.29 ionViewWillEnter style', this.tabBarElement );
  }
 
  ionViewWillLeave() {
    console.log('login.ts.33 ionViewWillLeave style', this.tabBarElement );
  }

  doLogin() {
    console.log('login.ts.37 doLogin() ' + JSON.stringify(this.loginData) );
    this.showLoader();
    this.authService.login(this.loginData).then((result) => {
      this.loading.dismiss();
      this.data = result;
      console.log('login.ts.42 result: ' + JSON.stringify(result) + '\n'  );
      console.log('login.ts.43 token: ' + JSON.stringify(this.data.usuarios.sessionid) );
      localStorage.setItem('token', this.data.usuarios.sessionid);
      localStorage.setItem('data', JSON.stringify(this.data));

      //this.data = localStorage.getItem("data");
      let coord = this.data.usuarios.coord;
      let pos = coord.indexOf(",");
      console.log( 'login.ts.50 coord:',  coord , ' pos: ' , pos);
      let llatitude = coord.substr(1,pos-1);
      let llongitude = coord.substr(pos+1,coord.length);
      console.log( 'login.ts.53 latitude:',  llatitude , ' longitude:', llongitude, "nivel:" , this.data.usuarios.nivel);
      switch (this.data.usuarios.nivel){
          case 3: console.log('login.ts.55 VS'); break;
          case 4: console.log('login.ts.56 NUVENS'); break;
      }
       
      this.navCtrl.setRoot(TabsPage);
    }, (err) => {
      this.loading.dismiss();
      console.log('login.ts.62 err: ' + err  );
      this.presentToast(err);
    });
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

  showLoader(){
    this.loading = this.loadingCtrl.create({
        content: 'login.ts Authenticating...'
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
