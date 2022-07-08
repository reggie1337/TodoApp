import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  createTodo(todo: Activity): Observable<DataResponse<IdResponse>> {
    return this._http.post<DataResponse<IdResponse>>(`${env.api}/todo`, todo);
  }
}
