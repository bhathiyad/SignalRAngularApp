import { Injectable, Injector } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpHandler, HttpEvent, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from "@angular/common/http";
//import { AuthService } from "./auth.service";
import { LoginService } from '../login/login.service';
import { TokenManager } from "../login/tokenManager";
import { Observable } from "rxjs";

@Injectable()
export class AuthResponseInterceptor implements HttpInterceptor {

  currentRequest: HttpRequest<any>;
  //auth: AuthService;
  private _accessTokenKey: string;

  constructor(
    private injector: Injector,
    private router: Router,
    private tokenManager: TokenManager,
    private loginService: LoginService
  ) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {

    var tokenObj = this.tokenManager.getToken();
    this._accessTokenKey = tokenObj != null ? tokenObj.accessToken.auth_token : null;

    if (this._accessTokenKey) {
      // save current request
      this.currentRequest = request;

      return next.handle(request)
        .do((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // do nothing
          }
        })
        .catch(error => {
          return this.handleError(error, next)
        });

    }
    else {
      return next.handle(request);
    }
  }

  handleError(err: any, next: HttpHandler) {
    if (err instanceof HttpErrorResponse) {
      if (err.status === 401) {
        // JWT token might be expired:
        // try to get a new one using refresh token
        console.log("Token expired. Attempting refresh...");

        var previousRequest = this.currentRequest;

        // thanks to @mattjones61 for the following code
        return this.loginService.refreshToken()
          .flatMap((refreshed) => {

            console.log("Refresh token received");

            var tokenObj = this.tokenManager.getToken();
            this._accessTokenKey = tokenObj != null ? tokenObj.accessToken.auth_token : null;

            if (tokenObj) {
              previousRequest = previousRequest.clone({
                setHeaders: { Authorization: `Bearer ${this._accessTokenKey}` }
              });
              console.log("header token reset");
            }
            return next.handle(previousRequest);
          });

      }
    }
    return Observable.throw(err);
  }
}
