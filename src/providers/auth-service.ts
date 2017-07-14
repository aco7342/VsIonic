import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

//let apiUrl = 'http://localhost:1337/localhost:8080/api/';
//let apiUrl = 'http://localhost:1880/';
//let apiUrl = 'http://192.168.1.35:1880/';
let apiUrl = 'http://192.168.1.34:1880/';

@Injectable()
export class AuthService {

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
            localStorage.clear();
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

}
