import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  nav : any;
  constructor(public navCtrl: NavController) {
	this.nav = navCtrl;
	console.log('contact.ts.13');
	console.log( 'ContactPage is active ',  this.nav.root.name == "ContactPage" );
	//console.log( this.navCtrl.getActive().name );
  }

}
