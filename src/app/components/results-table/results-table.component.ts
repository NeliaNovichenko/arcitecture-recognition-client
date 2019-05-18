import { Component, OnInit, ViewChild } from '@angular/core';
import { ResultService } from '../../services/result.service';

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

  constructor(private resultService: ResultService) { }

  public openModal(path, name) {
    this.modal.style.display = 'block';
    (this.modalImage as any).src = path;
    this.modalCaption.innerHTML = name;
  }

  public hideModal() {
    this.modal.style.display = 'none';
  }
}
