import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  nav : any;
  constructor(public navCtrl: NavController) {
	this.nav = navCtrl;
	console.log('about.ts.13');
	console.log( 'AboutPage is active ',  this.nav.root.name == "AboutPage" );
	//console.log( this.navCtrl.getActive().name );

  }

}
