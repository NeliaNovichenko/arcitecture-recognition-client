import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ResultService } from '../../services/result.service';
import { StyleNameString } from '../../models/style.enum';
import { ResultModel } from '../../models/result.model';

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.css']
})
export class ResultsTableComponent implements OnInit {

  @ViewChild('myModal')
  modal: ElementRef;

  @ViewChild('modalImage')
  modalImage: ElementRef;

  @ViewChild('modalCaption')
  modalCaption: ElementRef;

  public results = [];
  public styleNameMapper = StyleNameString;

  ngOnInit(): void {
    this.resultService.getAll().subscribe(
      (array) => {
        this.results = array.map(r => {
          (r as any).styleStr = StyleNameString[r.style];
          return r;
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  constructor(private resultService: ResultService) { }

  public openModal(path, name) {
    this.modal.nativeElement.style.display = 'block';
    this.modalImage.nativeElement.src = path;
    this.modalCaption.nativeElement.innerHTML = name;
  }

  public hideModal() {
    this.modal.nativeElement.style.display = 'none';
  }

  public deleteResult(id: number) {
    this.resultService.delete(id).subscribe(() => {
      const index = this.results.findIndex(r => r.id === id);
      this.results.splice(index, index);
    });
  }
}
