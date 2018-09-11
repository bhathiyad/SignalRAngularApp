import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { UserType } from './userType';
import { TokenResponeType, TokenType } from './tokenResponseType';
import { TokenManager } from "../login/tokenManager";
import { isPlatformBrowser } from '@angular/common';
import 'rxjs/Rx';

@Injectable()
export class LoginService {

  private _productUrl: string;
  private _headers: HttpHeaders;
  tokenType: TokenType = new TokenType();

  constructor(private _http: HttpClient,
              private _tokenManager: TokenManager,
              @Inject(PLATFORM_ID) private platformId: any) {

    this._productUrl = "https://localhost:44354/api/auth/auth"; //https://localhost:44354/api/auth/login
    this._headers = new HttpHeaders();
    this._headers.append('Content-Type', 'application/json');
    this._headers.append('Cache-Control', 'no-cache');
    this._headers.append('Pragma', 'no-cache');
    this._headers.append('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT');
  }

  login(userModel: UserType): Observable<TokenResponeType> {

    return this._http.post<TokenResponeType>(this._productUrl, userModel, { headers: this._headers })
      .catch(this.handleError);

  }

  refreshToken(): Observable<string> {

    var tokenObj = this._tokenManager.getToken();
    var refreshToken = tokenObj != null ? tokenObj.refreshToken : null;
    var id = tokenObj.accessToken.id;

    var url = "https://bpnewapi.azurewebsites.net/api/auth/auth"; //https://localhost:44354/api/auth/auth
    var data = {
      client_id: id,
      // required when signing up with username/password
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      // space-separated list of scopes for which the token is issued
      scope: "offline_access profile email"
    };

    return this.getAuthFromServer(url, data);
  }

  // retrieve the access & refresh tokens from the server
  getAuthFromServer(url: string, data: any): Observable<string> {

    console.log("Executing getAuthFromServer");
    return this._http.post<TokenResponeType>(url, data)
      .map((res) => {
        let token = res && res.token;
        // if the token is there, login has been successful
        if (token) {
          // store username and jwt token
          this.setAuth(res);
          // successful login
          //return true;

          console.log("getAuthFromServer Results received");
          return res;
        }

        // failed login
        return Observable.throw('Unauthorized');
      })
      .catch(error => {
        return new Observable<any>(error);
      });
  }

  // Persist auth into localStorage or removes it if a NULL argument is given
  setAuth(auth: TokenResponeType | null): boolean {
    if (isPlatformBrowser(this.platformId)) {
      if (auth) {
        //localStorage.setItem(
        //  this.authKey,
        //  JSON.stringify(auth));
        this.tokenType.accessToken = JSON.parse(auth.token);
        this.tokenType.expiration = auth.expiration;
        this.tokenType.refreshToken = auth.refreshToken;
        this._tokenManager.storeToken(this.tokenType);
      }
      else {
        //localStorage.removeItem(this.authKey);
      }
    }
    return true;
  }

  private handleError(err: Response | any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.json() != null) {
      errorMessage = `Server returned code: ${err.json().errCode}, error message is: ${err.json().errMsg}`;
      errorMessage = ` ${err.json().errMsg}`;
    }
    else if (err.type instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
      errorMessage = ` ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
      errorMessage = ` ${err.message}`;
    }
    console.error(errorMessage);
    alert("errorMessage");
    return Observable.throw(errorMessage);
  }
}
