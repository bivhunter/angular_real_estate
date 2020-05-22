import { Component, OnInit, Input } from '@angular/core';
import { Home } from '../../model/home';
import { Store } from '@ngrx/store';
import * as homesActions from 'src/app/store/actions/homes.action';
import { MatDialog } from '@angular/material/dialog';
import { PopupQuestionComponent } from 'src/app/modules/shared/components/popup-question/popup-question.component';

@Component({
  selector: 'app-home-card',
  templateUrl: './home-card.component.html',
  styleUrls: ['./home-card.component.css']
})
export class HomeCardComponent implements OnInit {

  @Input() home: Home;

  isAdding: boolean;
  isPopupListClients = false;

  constructor(
    private store: Store,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

  }

  onDeleteButton(): void {
    const deleteDialog = this.dialog.open(PopupQuestionComponent, {
      data: {
        title: 'Delete Home!',
        home: this.home
      }
    });
    deleteDialog.afterClosed().subscribe(
      answer => {
        if (answer) {
          this.deleteHome(this.home.id);
        }
      }
    );
  }

  deleteHome(id: string | number) {
    this.store.dispatch(homesActions.deleteHome({id}));
  }

  onViewedClient(): void {
    this.isAdding = false;
    this.isPopupListClients = true;
  }

  onAddClient(): void {
    this.isAdding = true;
    this.isPopupListClients = true;
  }
}
