import { Component, OnInit } from '@angular/core';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-popup-deactivate',
  templateUrl: './popup-deactivate.component.html',
  styleUrls: ['./popup-deactivate.component.css']
})
export class PopupDeactivateComponent implements OnInit {

  constructor(
    private popupService: PopupService
  ) { }

  ngOnInit(): void {
    console.log('inir popup');
  }

  onYes(): void {
    this.popupService.submitRouteDeactivate();
  }

  onNo(): void {
    this.popupService.cancelRouteDiactivate();
  }

}
