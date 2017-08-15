import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

//let apiUrl = 'http://localhost:1337/localhost:8080/api/';
//let apiUrl = 'http://localhost:1880/';
//let apiUrl = 'http://192.168.1.35:1880/';
//let apiUrl = 'http://192.168.1.34:1880/';
//let _Url =  '//192.168.1.34:1880';
let _Url =  '//localhost:1880';
let apiUrl = 'http:' + _Url + '/';

let apiWs = 'ws:' + _Url ;

@Injectable()
export class AuthService {

    // This is a variable for our WebSocket.
  ws : any;
  wsLogin : boolean = false;
  idexterno : any;
  constructor(public http: Http) {}

  login(credentials) {
    console.log('auth-services.ts.15 login('+ JSON.stringify(credentials)+')');
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post(apiUrl+'login', JSON.stringify(credentials), {headers: headers})
          .subscribe(res => {
            console.log('auth-services.ts.22 login(res:'+ res + ')');
            resolve(res.json());
          }, (err) => {
            console.log('auth-services.ts.25 login(err:'+ err + ')');
            reject(err);
          });
    });
  }

  register(data) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this.http.post(apiUrl+'guest/signup', JSON.stringify(data), {headers: headers})
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }

  logout(credentials){
    console.log('auth-services.ts.46 logout('+ JSON.stringify(credentials)+')');
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('X-Auth-Token', localStorage.getItem('token'));
        this.http.post(apiUrl+'logout', {}, {headers: headers})
        //headers.append('Content-Type', 'application/json');
        //this.http.post(apiUrl+'logout', JSON.stringify(credentials), {headers: headers})
          .subscribe(res => {
            var token = localStorage.getItem("token");
            console.log('auth-services.ts.55 logout() / clear \n' + /*res.json()*/ res + ' :' + token);  
            //localStorage.clear();
            token = localStorage.getItem("token");
            console.log('auth-services.ts.58 logout() :' + token);  
            resolve();
          }, (err) => {
            console.log('auth-services.ts.61 logout(err:'+ err + ')');
            localStorage.clear();
            reject(err);
          });
    });
  }
  
  ws_login(){
        let data = JSON.parse( localStorage.getItem("data") ) ;
        
        this.idexterno = '';
        if (data)
            this.idexterno = data.usuarios.idexterno;
        this.ws = new WebSocket( apiWs , []);
        // Set the function to be called when a message is received.
        this.ws.onopen = () => {
          console.log('open');
          this.wsLogin = true;
        };

        this.ws.onmessage = (event) => {
          console.log('new message: ' + event.data);
          localStorage.setItem('ws', JSON.stringify(event.data));
        };

        this.ws.onerror = () => {
          console.log('error occurred!');
        };

        this.ws.onclose = (event) => {
          this.wsLogin = false;
          console.log('close code=' + event.code);
          this.ws_login();
        };
  }

  ws_send(msg) {
    var nameAndMsg = this.idexterno + ":" + msg;
    if (!this.wsLogin)
        this.ws_login();
    
    if (this.idexterno)
       this.ws.send(nameAndMsg);
  }

}
