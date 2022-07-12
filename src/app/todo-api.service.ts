import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataResponse } from './data-response';
import { Activity } from './activity';
import { environment as env } from '../environments/environment';
import { IdResponse } from './id-response';

@Injectable({
  providedIn: 'root',
})
export class TodoApiService {
  constructor(private _http: HttpClient) {}

  getTodos(): Observable<DataResponse<Activity[]>> {
    return this._http.get<DataResponse<Activity[]>>(`${env.api}/todo`);
  }

  createTodo(body: string): Observable<DataResponse<IdResponse>> {
    const headerOptions = new HttpHeaders();
    headerOptions.set('Content-Type', 'application/json');
    return this._http.post<DataResponse<IdResponse>>(
      `${env.api}/todo`,
      {
        Body: body,
      },
      { headers: headerOptions }
    );
  }
}
