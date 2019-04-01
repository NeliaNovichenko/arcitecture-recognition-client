import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PredictionResult } from '../models/prediction-result.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {
  private  url = '/api/recognition';
  constructor(private http: HttpClient) { }

  public get(file): Observable<PredictionResult> {
    const data: FormData = new FormData();
    data.append('image', file, file.name);

    return this.http.post<PredictionResult>(this.url, data);
  }
}
