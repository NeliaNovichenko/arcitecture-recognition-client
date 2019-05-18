import { Component, OnInit, ViewChild } from '@angular/core';
import { ResultService } from '../../services/result.service';
import { StyleNameString } from '../../models/style.enum';

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.css']
})
export class ResultsTableComponent {

  @ViewChild('myModal')
  modal: HTMLElement;

  @ViewChild('modalImage')
  modalImage: HTMLElement;

  @ViewChild('modalCaption')
  modalCaption: HTMLElement;

  public results$ = this.resultService.getAll();

  public styleNameMapper = StyleNameString;

  constructor(private resultService: ResultService) { }

  public openModal(path, name) {
    this.modal.style.display = 'block';
    (this.modalImage as any).src = path;
    this.modalCaption.innerHTML = name;
  }

  public hideModal() {
    this.modal.style.display = 'none';
  }

  public deleteResult(id: number) {
    this.resultService.delete(id);
  }
}
