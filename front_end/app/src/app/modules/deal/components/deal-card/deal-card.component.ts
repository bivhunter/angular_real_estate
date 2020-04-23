import { Component, OnInit, Input } from '@angular/core';
import { Deal } from '../../model/deal';
import { Router } from '@angular/router';
import { DealsService } from 'src/app/modules/deal/services/deals.service';

@Component({
  selector: 'app-deal-card',
  templateUrl: './deal-card.component.html',
  styleUrls: ['./deal-card.component.css']
})
export class DealCardComponent implements OnInit {

  @Input() deal: Deal;

  isPopup = false;
  isAdding: boolean;
  isPopupListClients = false;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {

  }

  onHome(id: string | number) {
    this.router.navigateByUrl(`homes/details/${id}`);
  }

  onClient(id: string | number) {
    if (!id) {
      return;
    }
    this.router.navigateByUrl(`clients/profile/${id}`);
  }

  onDeal(id: string | number) {
    this.router.navigateByUrl(`deals/details/${id}`);
  }

}
