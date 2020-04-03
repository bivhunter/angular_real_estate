import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  onYes(): void {
    this.submitEvent.emit();
  }

  onNo(): void {
    this.cancelEvent.emit();
  }

}
