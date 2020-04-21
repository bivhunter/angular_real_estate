import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, ChildActivationEnd, RouterStateSnapshot } from '@angular/router';
import { Client } from 'src/app/modules/clients/model/client';
import { ClientService } from 'src/app/modules/shared/services/clients.service';
import { Location } from '@angular/common';
import { ClientsFilteringService } from '../../../shared/services/clients-filtering.service';
import { NgModel } from '@angular/forms';
import { PopupService } from './../../../shared/services/popup.service';
import { CanComponentDeactivate } from 'src/app/modules/shared/guards/can-deactivate.guard';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit, CanComponentDeactivate {

  client: Client;
  initClient: Client;
  currentDate: Date = new Date();
  isDataReady = false;
  title: string;
  isAddingMode: boolean;

  private isSubmit = false;
  @ViewChild('birthday') birthdayInput: NgModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private popupService: PopupService,
    private clientService: ClientService,
    private clientsFilteringService: ClientsFilteringService,
  ) { }

  ngOnInit(): void {
    this.isAddingMode = this.checkAddingMode();
    this.getClient();
  }

  async canDeactivate(next: RouterStateSnapshot): Promise<boolean> {
    if (this.compareClient()) {
      return true;
    }
    if (this.isSubmit) {
      return true;
    }
    return this.popupService.canDeactivate(next);
  }

  onEditClient(): void {
    this.isSubmit = true;
    this.clientService.updateClient(this.client).subscribe(
      () => this.navigateBack(),
      (error) => console.log(error)
    );
  }

  onAddClient(): void {
    this.isSubmit = true;
    this.clientService.addClient(this.client).subscribe(
      () => this.navigateBack(),
      (error) => console.log(error)
    );
  }

  onPhoneChange(phone: string): void {
    console.log(phone);
    this.client.phone = this.clientsFilteringService.filterPhone(phone);
  }

  onCancelButtonClick() {
    this.navigateBack();
  }

  onBirthdayChange(date: string) {
    if (Date.parse(date) > this.currentDate.valueOf()) {
      this.client.birthday = this.currentDate;
      const dateString = this.reformatDate(new Date().toDateString());
      this.birthdayInput.reset(dateString);
      return;
    }
    this.client.birthday = new Date (Date.parse(date));
  }

  reformatDate(dateStr: string): string {
    const date = new Date(Date.parse(dateStr));
    const dateString = date.getFullYear() + '-'
    + ('0' + (date.getMonth() + 1)).slice(-2) + '-'
    + ('0' + (date.getDate() )).slice(-2);
    return dateString;
  }

  private navigateBack(): void {
    this.location.back();
    // this.router.navigateByUrl('/clients');
  }

  private compareClient(): boolean {
    console.log(this.client, this.initClient);
    for (const prop in this.client) {
      if ((this.initClient[prop] === undefined) || (this.initClient[prop] !== this.client[prop])) {
        return false;
      }
    }
    return true;
  }

  private checkAddingMode() {
    const mode = this.route.snapshot.data.mode;
    return mode === 'Adding' ? true : false;
  }

  private getClient(): void {
    if (this.isAddingMode) {
      this.onGetClient(new Client());
      this.title = 'Add Client';
    } else {
      const id = this.getId();
      this.title = `Client's profile`;
      this.clientService.getClient(id).subscribe(
      (client) => this.onGetClient(client),
      (error) => console.log(error)
    );
    }
  }

  private onGetClient(client: Client): void {
    this.client = client;
    this.initClient = {...client};
    this.isDataReady = true;
  }

  private getId(): string | number {
    return this.route.snapshot.paramMap.get('id');
  }

}
