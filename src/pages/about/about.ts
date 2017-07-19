import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NavController } from 'ionic-angular';

import {GoogleMap, GoogleMapsEvent, GoogleMapsMarker, GoogleMapsLatLng} from 'ionic-native';

//import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng/*, GoogleMapsMarkerOptions*/} from 'ionic-native';

//import {Observable} from 'rxjs/Observable';
//import 'rxjs/add/operator/map';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  nav : any;
  map: GoogleMap;
  isApp: boolean = true;
  constructor(public navCtrl: NavController,
    private platform: Platform) {
    this.nav = navCtrl;
	if (platform.is('core') || platform.is('mobileweb')) {
       this.isApp = false;
    }
    console.log('about.ts.22');
    console.log( 'AboutPage is active ',  this.nav.root.name == "AboutPage" );
    //console.log( this.navCtrl.getActive().name );
    
    platform.ready().then((source) => {
            console.log('about.ts.ready.26 source:',source, ' isApp:' , this.isApp);
            this.loadMap();
            console.log('about.ts.ready.28');
            this.setupGoogleMap();
    });
  }

    loadMap(){
        console.log('about.ts loadMap.34', this.isApp);

        let location = new GoogleMapsLatLng(-34.9290,138.6010);

        this.map = new GoogleMap('map', {
          'backgroundColor': 'white',
          'controls': {
            'compass': true,
            'myLocationButton': true,
            'indoorPicker': true,
            'zoom': true
          },
          'gestures': {
            'scroll': true,
            'tilt': true,
            'rotate': true,
            'zoom': true
          },
          'camera': {
            'latLng': location,
            'tilt': 30,
            'zoom': 15,
            'bearing': 50
          }
        });
        if (this.isApp){
			this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {   //this.service(...).then(res => {}, err => {}) 
				console.log('Map is ready!');
			});
		} else {
			console.log('Simulator Map')
		}

    }

    setupGoogleMap(){
        console.log('about.ts setupGoogleMap.67');
        // somewhere in your component
        /*
        this.map = new GoogleMap('map');

        let marker = new GoogleMapsMarker(this.map);
        marker.setTitle("Teste");
        let latLng = new GoogleMapsLatLng(-53.6339946,-76.6077185);
        marker.setPosition(latLng);

        this.map.setCenter(latLng);
        this.map.setZoom(12);

        this.map.on(GoogleMapsEvent.MAP_READY)
        .subscribe(() => console.log("Map is ready!"));*/
    }
}
