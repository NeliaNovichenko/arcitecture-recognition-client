import { Component, ViewChild } from '@angular/core';
import { PredictionService } from '../../services/prediction.service';
import { PredictionResult } from '../../models/prediction-result.model';
import { ResultService } from '../../services/result.service';
import { StyleNameString } from '../../models/style.enum';
import { ResultModel } from '../../models/result.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-prediction',
  templateUrl: './prediction.component.html',
  styleUrls: ['./prediction.component.css']
})
export class PredictionComponent {

  @ViewChild('imagePreview')
  imagePreviewElement;

  public styleNameMapper = StyleNameString;
  public current = this.userService.currentUser;
  public file: any;
  public results: PredictionResult[];
  public loading = false;
  public saved = false;

  constructor(
    private predictionService: PredictionService,
    private resultService: ResultService,
    private userService: UserService
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
    this.results = null;
    this.loading = true;
    this.predictionService.get(this.file).subscribe(value => {
      this.results = value;
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
      style: this.results[0].style
    } as ResultModel;

    this.resultService.crete(result, this.file).subscribe(() => {
      console.log('saved');
      this.saved = true;
    });
  }
}
