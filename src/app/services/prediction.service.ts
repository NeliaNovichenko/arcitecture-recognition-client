import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PredictionResult, PredictionResultObject } from '../models/prediction-result.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StyleByStringName } from '../models/style.enum';

@Injectable({
  providedIn: 'root'
})
export class PredictionService {
  private  url = '/api/recognition';
  constructor(private http: HttpClient) { }

  public get(file): Observable<PredictionResult[]> {
    const data: FormData = new FormData();
    data.append('image', file, file.name);

    return this.http.post<PredictionResultObject>(this.url, data).pipe(
      map(resultObject => {
        const resultArray: PredictionResult[] = [];
        Object.keys(resultObject).forEach(key => {
          resultArray.push({
            style: key,
            probability: resultObject[key]
          });
        });
        return resultArray.sort((r1, r2) => r2.probability - r1.probability);
      })
    );
  }
}
