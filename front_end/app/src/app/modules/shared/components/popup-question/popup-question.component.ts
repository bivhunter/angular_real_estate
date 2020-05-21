import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPopupQuestionConf } from '../../types/types';

@Component({
  selector: 'app-popup-question',
  templateUrl: './popup-question.component.html',
  styleUrls: ['./popup-question.component.css']
})
export class PopupQuestionComponent implements OnInit {

  @Input() title: string;
  @Input() text: string;
  @Output() submitEvent: EventEmitter<any> = new EventEmitter();
  @Output() cancelEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IPopupQuestionConf
  ) { }

  ngOnInit(): void {
  }

  onYes(): void {
    this.submitEvent.emit();
  }

  onNo(): void {
    this.cancelEvent.emit();
  }

}
