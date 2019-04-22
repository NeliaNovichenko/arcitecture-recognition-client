import { Component, ViewChild } from '@angular/core';
import { PredictionService } from '../../services/prediction.service';
import { Observable, EMPTY } from 'rxjs';
import { PredictionResult } from '../../models/prediction-result.model';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css']
})
export class PredictionComponent {

  @ViewChild('imagePreview')
  imagePreviewElement;

  public objectKeys = Object.keys;
  public file: any = {};
  public result: PredictionResult;
  public loading = false;

  constructor(
    private predictionService: PredictionService,
  ) { }

  onFileChanged(event: any) {
    this.file = event.target.files[0];
    this.imagePreviewElement.nativeElement.src = URL.createObjectURL(this.file);
  }

  sendImage() {
    if (File.name === undefined) {
      return;
    }
    this.result = null;
    this.loading = true;
    this.predictionService.get(this.file).subscribe(value => {
      this.result = value;
      this.loading = false;
    });
  }

  saveResult() {

  }
}
