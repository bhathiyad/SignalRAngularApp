import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpClient, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpUserEvent
} from '@angular/common/http';

//import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { HttpErrorResponse } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import { TokenManager } from "../login/tokenManager";
import { LoginService } from '../login/login.service';
import { Observable, BehaviorSubject} from 'rxjs';
import { _throw } from 'rxjs/observable/throw';
import { map, catchError, finalize, flatMap } from 'rxjs/operators';
import { switchMap } from 'rxjs/operator/switchMap';
import { filter } from 'rxjs/operator/filter';
import { take } from 'rxjs/operator/take';

@Injectable()
export class InterceptorService implements HttpInterceptor {
    private _accessTokenKey: string;
    private _headers: HttpHeaders;

    constructor(private tokenManager: TokenManager) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //if (!req.url.includes('VotingAppViewUsers'))
        //    req = req.clone({ withCredentials: true });
      var tokenObj = this.tokenManager.getToken();
      this._accessTokenKey = tokenObj != null ? tokenObj.accessToken.auth_token : null;
      const changedReq = req;

      if (!req.url.includes('login')) {

            const changedReq = req.clone({
                headers: req.headers
                    .set('Content-Type', 'application/json')
                    .set('Pragma', 'no-cache').set('Expires', '0')
                    .set('Authorization', 'Bearer ' + this._accessTokenKey)
                    .set('Cache-Control', 'no-cache, no-store, must-revalidate')
                    .set('Content-Security-Policy', "default-src 'self';")
                    .set('X-Content-Type-Options', 'nosniff')
                    .set('Access-Control-Allow-Origin', 'true')
            });

            return next.handle(changedReq);
        }

        return next.handle(changedReq);
    }

}

