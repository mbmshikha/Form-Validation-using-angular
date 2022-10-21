import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, mergeMap, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiHandlerService {
  API_URL = 'https://reqres.in/api/login/';

  constructor(private http: HttpClient) { }

  public callApi() {
    console.log("callApi");
    let email = '';
    let password = '';
    //    return this.http.post<any>(`${this.serverUrl}api/login`, {username: username, password: password})
    const _options = this.createHttpHeaders('');
    let data = { email: 'eve.holt@reqres.in', password: 'cityslicka' };

    let srcObservable1 = this.http.post(this.API_URL, data, _options);


    let srcObservable = this.http.post(this.API_URL, data, this.createHttpHeaders(''));
    //let innerObservable = of('A', 'B', 'C', 'D')

    srcObservable.pipe(
      mergeMap((val: any) => {
        console.log('Source value ' + val)
        return of(val)
      }),
      mergeMap((val1: any) => {
        return this.http.post('https://reqres.in/api/unknown', {}, this.createHttpHeaders(val1['token']))
      })).subscribe((resp: any) => {
        console.log(resp)
      }
      )


  }
  private createHttpHeaders(token: any) {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'authorization': token,
        'X-Skip-Interceptor': '',
      }
      )
    };
    // this.http.post(this.API_URL, data/*, _options*/).subscribe((resp: any) => {
    //   console.log(resp);
    //   window.alert("User Logged-in successfully! ");
    //   userToken = JSON.stringify(resp);
    //   const _options1 = {
    //     headers: {
    //       'Authorization': `Bearer ${resp['token']}`,
    //       'Content-type': 'application/json'
    //     }
    //   }
    //   this.http.post('https://reqres.in/api/unknown/', {}, _options1).subscribe((users) => {
    //     console.log('user list: ', users)
    //   }, (err) => {

    //   }, () => {
    //     console.log('completed2');
    //   })

    // }, (err) => {
    //   console.log(err)
    // }, () => {
    //   console.log('completed');
    // }
    // );
  }

}



