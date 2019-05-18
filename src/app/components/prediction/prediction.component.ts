import { Component, ViewChild } from '@angular/core';
import { PredictionService } from '../../services/prediction.service';
import { PredictionResult } from '../../models/prediction-result.model';
import { ResultService } from '../../services/result.service';
import { StyleByStringName } from '../../models/style.enum';
import { ResultModel } from 'src/app/models/result.model';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css']
})
export class PredictionComponent {

  @ViewChild('imagePreview')
  imagePreviewElement;

  public file: any;
  public result: PredictionResult[];
  public loading = false;
  public saved = false;

  public title;
  public description;
  public imageDate: Date;

  constructor(
    private predictionService: PredictionService,
    private resultService: ResultService
  ) { }

  onFileChanged(event: any) {
    this.saved = false;
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

  saveResult( title, description, imageDate) {
    this.saved = false;
    const result = {
      title,
      description,
      date: new Date(),
      imageDate,
      imageName: this.file.name,

      style: StyleByStringName[this.result[0].style]
    } as ResultModel;

    this.resultService.crete(result, this.file).subscribe(() => {
      console.log('saved');
      this.saved = true;
    });
  }
}
