import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResultModel } from '../models/result.model';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  private baseUrl = '/api/recognitionResult';

  constructor(private http: HttpClient) { }

  getAll(): Observable<ResultModel[]> {
    const url = `${this.baseUrl}`;
    return this.http.get<ResultModel[]>(url);
  }

  get(id: number): Observable<ResultModel> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<ResultModel>(url);
  }

  crete(resultDto: ResultModel, file: File): Observable<ResultModel> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    const url = `${this.baseUrl}`;
    return this.http.post<ResultModel>(url, { resultDto, file: formData });
  }

  update(id: number, resultDto: ResultModel): Observable<ResultModel> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<ResultModel>(url, resultDto);
  }

  delete(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
