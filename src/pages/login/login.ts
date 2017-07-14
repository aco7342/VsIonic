import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public authService: AuthService, public loadingCtrl: LoadingController, private toastCtrl: ToastController) {
	this.nav = navCtrl;
	console.log('login.ts.19');
	console.log( 'LoginPage is active ',  this.nav.root.name == "LoginPage" );	
	//console.log( this.navCtrl.getActive().name );
  }

  doLogin() {
    console.log('login.ts.20 doLogin() ' + JSON.stringify(this.loginData) );
    this.showLoader();
    this.authService.login(this.loginData).then((result) => {
      this.loading.dismiss();
      this.data = result;
	  console.log('login.ts.25 result: ' + JSON.stringify(result) + '\n'  );
	  console.log('login.ts.26 token: ' + JSON.stringify(this.data.usuarios.sessionid) );
      localStorage.setItem('token', this.data.usuarios.sessionid);
	  localStorage.setItem('data', this.data);
      this.navCtrl.setRoot(TabsPage);
    }, (err) => {
      this.loading.dismiss();
	  console.log('login.ts.31 err: ' + err  );
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
