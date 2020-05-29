import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IPopupQuestionConf } from '../../types/types';

@Component({
  selector: 'app-popup-question',
  templateUrl: './popup-question.component.html',
  styleUrls: ['./popup-question.component.css']
})
export class PopupQuestionComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IPopupQuestionConf
  ) { }

  ngOnInit(): void {
  }
}
