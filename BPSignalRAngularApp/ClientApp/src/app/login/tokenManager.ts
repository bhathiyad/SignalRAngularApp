import { Injectable } from '@angular/core';
import { TokenResponeType } from './tokenResponseType';
import { TokenType } from './tokenResponseType';
//import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class TokenManager {

  private _tokenKey: string = 'bapp_key';

  storeToken(tokenDetail: TokenType) {
    localStorage.setItem(this._tokenKey, JSON.stringify(tokenDetail));
  }

  getToken() {
    var tokenDetails = localStorage.getItem(this._tokenKey);
    return JSON.parse(tokenDetails);
  }
}
