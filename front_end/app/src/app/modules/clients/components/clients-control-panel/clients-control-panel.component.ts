import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as clientsActions from 'src/app/store/actions/clients.action';
import * as clientsSelectors from 'src/app/store/selectors/clients.selector';
import { TViewMode } from 'src/app/modules/shared/types/types';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-clients-control-panel',
  templateUrl: './clients-control-panel.component.html',
  styleUrls: ['./clients-control-panel.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientsControlPanelComponent implements OnInit, OnDestroy {

  viewMode: TViewMode;
  private storeSubscription: Subscription;

  constructor(
    private store: Store
  ) { }

  ngOnInit(): void {
    this.changeFilter('');
    this.storeSubscription = this.store.select(clientsSelectors.getViewMode).subscribe(
      viewMode => this.viewMode = viewMode
    );
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }

  onActivateCardView() {
    this.viewMode = 'cards';
    this.store.dispatch(clientsActions.setViewMode({viewMode: 'cards'}));
  }

  onActivateListView() {
    this.viewMode = 'list';
    this.store.dispatch(clientsActions.setViewMode({viewMode: 'list'}));
  }

  changeFilter(searchingString: string): void {
    this.store.dispatch(clientsActions.setSearchingString({searchingString}));
  }
}
