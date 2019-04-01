import { Component } from '@angular/core';
import { PredictionService } from '../../services/prediction.service';
import { Observable, EMPTY } from 'rxjs';
import { PredictionResult } from '../../models/prediction-result.model';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css']
})
export class PredictionComponent {

  constructor(private predictionService: PredictionService) { }

  public file: any = {};
  public result$: Observable<PredictionResult> = EMPTY;

  onFileChanged(event: any) {
    this.file = event.target.files[0];
  }

  sendImage() {
    this.result$ = this.predictionService.get(this.file);
  }
}
