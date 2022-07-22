import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataResponse } from '../models/data-response';
import { Activity } from '../models/activity';
import { environment as env } from '../../environments/environment';
import { IdResponse } from '../models/id-response';

@Injectable({
  providedIn: 'root',
})
export class TodoApiService {
  constructor(private _http: HttpClient) {}

  getTodos(): Observable<DataResponse<Activity[]>> {
    return this._http.get<DataResponse<Activity[]>>(`${env.api}/todo`);
  }

  createTodo(body: string): Observable<DataResponse<IdResponse>> {
    return this._http.post<DataResponse<IdResponse>>(`${env.api}/todo`, {
      Body: body,
    });
  }

  deleteTodo(id: number): Observable<DataResponse<IdResponse>> {
    return this._http.delete<DataResponse<IdResponse>>(`${env.api}/todo/${id}`);
  }

  editTodos(task: Activity): Observable<DataResponse<IdResponse>> {
    return this._http.put<DataResponse<IdResponse>>(
      `${env.api}/todo/${task.id}`,
      task
    );
  }
}
