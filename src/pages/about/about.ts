import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NavController,App } from 'ionic-angular';

import {Geolocation, GoogleMap, GoogleMapsEvent /*, GoogleMapsMarker*/, GoogleMapsLatLng} from 'ionic-native';

//import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng/*, GoogleMapsMarkerOptions*/} from 'ionic-native';

//import {Observable} from 'rxjs/Observable';
//import 'rxjs/add/operator/map';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  nav : any;
  app : any;
  map: GoogleMap;
  Applatitude : any;
  Applongitude : any;
  mklatitude : any;
  mklongitude: any;
  mktitle : any;
  data : any;
  isApp: boolean = true;
  constructor(public navCtrl: NavController,
    public apP: App,
    private platform: Platform) {
    this.nav = navCtrl;
    this.app = apP;
    if (platform.is('core') || platform.is('mobileweb')) {
       this.isApp = false;
    }
    console.log('about.ts.22');
    console.log( 'AboutPage is active ',  this.nav.root.name == "AboutPage" );
    //console.log( this.navCtrl.getActive().name );

    platform.ready().then((source) => {
            this.Applatitude =   -34.9290 ;
            this.Applongitude =  138.6010 ;
            //this.Coord = { latitude:-23.5498723  , longitude:-46.6361756 } ; //-23.5498723,-46.6361756
            //console.log( ' about.ts.44.Latitude:' + this.app.Coord.latitude + ' Longitude:' + this.app.Coord.longitude);
            console.dir( this.app );
            
            this.data = JSON.parse( localStorage.getItem("data") ) ;
            console.log('about.ts.42');
            //console.dir( this.data );
            //console.log( this.data.usuarios );
            //console.log( this.data.usuarios.coord );
            //console.log(  this.data.usuarios.nomeid + ' - ' + this.data.usuarios.end );
            
            let coord = this.data.usuarios.coord;
            let pos = coord.indexOf(",");
            console.log( 'about.ts.50 coord:',  coord , ' pos: ' , pos);
            this.Applatitude =  parseFloat( coord.substr(1,pos-1) );
            this.Applongitude =  parseFloat( coord.substr(pos+1,coord.length) );
            
            let position = JSON.parse( localStorage.getItem('coord' ) );
            if (position){ 
                this.Applatitude = position.latitude;
                this.Applongitude = position.longitude;
                console.log( 'about.ts.64 latitude:',  position.latitude , ' longitude: ' , position.longitude);
            }
            
            this.mklatitude = this.Applatitude;
            this.mklongitude = this.Applongitude
            this.mktitle = this.data.usuarios.nomeid + ' - ' + this.data.usuarios.end;
            
            console.log( 'about.ts.71 latitude:',  this.mklatitude , ' longitude:', this.mklongitude , ' title:' , this.mktitle);

            Geolocation.getCurrentPosition().then((pos) => {
               console.log('about.ts.74 lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
               this.Applatitude = pos.coords.latitude;
               this.Applongitude = pos.coords.longitude;
            }).catch((error) => {
               console.log('Error getting location', error);
            });
            
            let nivel = this.data.usuarios.nivel;
            console.log('about.ts.ready.80 source:',source, ' isApp:' , this.isApp);
            this.loadMap();
            console.log('about.ts.ready.82');
            this.addMarkers();
            if (nivel == 3) {
                let f = this.data.locais.length
                console.log( 'about.ts.85.tam vetor:', f);
                for (let i = 0; i < f ; i++){
                             //console.dir( this.data.locais[i] );
                             this.mktitle = this.data.locais[i].nomeid + ' - ' + this.data.locais[i].end;
                             coord = this.data.locais[i].coord;
                             pos = coord.indexOf(",");
                             console.log( 'about.ts.91 pos:',  pos , ' coord:', coord);
                             this.mklatitude =  parseFloat( coord.substr(1,pos-1) );
                             this.mklongitude =  parseFloat( coord.substr(pos+1,coord.length) );
                             console.log( 'about.ts.94 latitude:',  this.mklatitude , ' longitude:', this.mklongitude , ' title:' , this.mktitle);
                             this.addMarkers();
                }
            }
            
    });
  }

    loadMap(){
        console.log('about.ts loadMap.103', this.isApp);
        
        let location = new GoogleMapsLatLng(this.Applatitude,this.Applongitude);

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
            'zoom': 3, //15
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
    
    addMarkers() {
        if (this.isApp){
            this.map.on(GoogleMapsEvent.MAP_READY).subscribe((map) => {
               map.addMarker({   
                'position': new GoogleMapsLatLng(this.mklatitude, this.mklongitude),
                'title': this.mktitle
               },  (marker) => {
                    marker.addEventListener(GoogleMapsEvent.INFO_CLICK, () => {
                        console.log("You clicked " + marker.getTitle());
                    });
               });
            });
        } else {
            console.log('Simulator Map addMarker')
        }
    }
}
