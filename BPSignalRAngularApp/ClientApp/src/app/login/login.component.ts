import { Component } from '@angular/core';
import { UserType } from './userType';
import { LoginService } from './login.service';
import { TokenResponeType } from './tokenResponseType';
import { TokenType } from './tokenResponseType';
import { Router } from '@angular/router';
import { TokenManager } from './tokenManager';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [LoginService, TokenManager]
})
export class LoginComponent {

  userModel: UserType = new UserType();
  tokenResponse: TokenResponeType = null;
  tokenType: TokenType = new TokenType();

  constructor(private _loginService: LoginService, private router: Router, private _tokenManager: TokenManager) {

  }

  login(): void {

    this.userModel.grant_type = "password";

    this._loginService.login(this.userModel)
      .subscribe(res => {

        this.tokenType.accessToken = JSON.parse(res.token);
        this.tokenType.expiration = res.expiration;
        this.tokenType.refreshToken = res.refreshToken;

        if (this.tokenType.accessToken) {

          this._tokenManager.storeToken(this.tokenType);
          this.router.navigate(['./home']);

        } else {
          //log error
        }

      },
        error => {

          //this.errorMessage = <any>error;
          //this.loaderEnabled = false;

        });

  }

}
