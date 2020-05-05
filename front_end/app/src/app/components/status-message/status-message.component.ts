import { Component, OnInit, Input } from '@angular/core';
import { TMessage } from 'src/app/modules/shared/types/types';

@Component({
  selector: 'app-status-message',
  templateUrl: './status-message.component.html',
  styleUrls: ['./status-message.component.css']
})
export class StatusMessageComponent implements OnInit {

  @Input() message: TMessage;

  isShow = false;
  constructor() { }

  ngOnInit(): void {
      setTimeout(() => {
        this.isShow = true;
      }, 4);

      setTimeout(() => {
        this.isShow = false;
      }, 3000);
  }

}
