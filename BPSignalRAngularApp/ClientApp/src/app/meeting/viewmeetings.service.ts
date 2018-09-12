import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class ViewMeetingsService {

  private _productUrl: string;
  private _headers: HttpHeaders;

  constructor(private _http: HttpClient) {

    this._productUrl = "https://bpangularapp.azurewebsites.net/api/meeting"; //https://localhost:44314/api/meeting  //"https://localhost:44354/api/meeting"//this._appSettingService.getSettings().serverWithAPIUrl + 'group/';
    this._headers = new HttpHeaders();
    this._headers.append('Content-Type', 'application/json');
    this._headers.append('Cache-Control', 'no-cache');
    this._headers.append('Pragma', 'no-cache');
    this._headers.append('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT');
  }

  getMeetings() {

    return this._http.get<any[]>(this._productUrl, { headers: this._headers })
                .catch(this.handleError);
  }

  private handleError(err: Response | any) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    //let errorMessage = '';
    //if (err.json() != null) {
    //  errorMessage = `Server returned code: ${err.json().errCode}, error message is: ${err.json().errMsg}`;
    //  errorMessage = ` ${err.json().errMsg}`;
    //}
    //else if (err.type instanceof Error) {
    //  // A client-side or network error occurred. Handle it accordingly.
    //  errorMessage = `An error occurred: ${err.error.message}`;
    //  errorMessage = ` ${err.error.message}`;
    //} else {
    //  // The backend returned an unsuccessful response code.
    //  // The response body may contain clues as to what went wrong,
    //  errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    //  errorMessage = ` ${err.message}`;
    //}
    //console.error(errorMessage);
    //alert("errorMessage");
    return Observable.throw(err);
  }
}
