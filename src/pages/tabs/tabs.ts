import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { HomePage } from '../home/home';
import { NuvemPage } from '../nuvem/nuvem';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = AboutPage;
  tab3Root: any = ContactPage;

  constructor(public navCtrl: NavController, public app: App,) {
        let token = localStorage.getItem("token");
        let data = JSON.parse( localStorage.getItem("data") ) ;
        let nivel = 3;
        if (data)
            nivel = data.usuarios.nivel
        console.log('tabs.ts.20:'+token , ' Nivel:'  , nivel);
        switch(nivel){
            case 3:  this.tab1Root = HomePage; break;
            case 4:  this.tab1Root = NuvemPage; break;
        }
        if(!token) {
            console.log('tabs.ts.28');
            //navCtrl.setRoot(LoginPage); ok
            //navCtrl.parent.parent.setRoot(LoginPage);
            app.getRootNav().setRoot(LoginPage);
        } else {
        }
  }
}
