import { Component, OnInit, OnDestroy } from '@angular/core';
import { PopupService } from '../../services/popup.service';

@Component({
  selector: 'app-popup-deactivate',
  templateUrl: './popup-deactivate.component.html',
  styleUrls: ['./popup-deactivate.component.css']
})
export class PopupDeactivateComponent implements OnInit, OnDestroy {

  constructor(
    private popupService: PopupService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  onYes(): void {
    this.popupService.submitRouteDeactivate();
  }

  onNo(): void {
    this.popupService.cancelRouteDiactivate();
  }

}
