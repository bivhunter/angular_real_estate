import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, ChildActivationEnd } from '@angular/router';
import { Client } from 'src/app/modules/clients/model/client';
import { ClientService } from 'src/app/modules/shared/services/clients.service';
import { Location } from '@angular/common';
import { ClientsFilteringService } from '../../../shared/services/clients-filtering.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit {

  client: Client;
  currentDate: Date = new Date();
  isDataReady = false;
  title: string;
  isAddingMode: boolean;
  @ViewChild('birthday') birthdayInput: NgModel;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private clientService: ClientService,
    private clientsFilteringService: ClientsFilteringService
  ) { }

  ngOnInit(): void {
    this.isAddingMode = this.checkAddingMode();
    this.getClient();
  }

  onEditClient(): void {
    this.clientService.updateClient(this.client).subscribe(
      () => this.navigateBack(),
      (error) => console.log(error)
    );
  }

  onAddClient(): void {
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
    console.log (this.birthdayInput)
    if (Date.parse(date) > this.currentDate.valueOf()) {
      console.log('no valid')
      this.client.birthday = this.currentDate;
      this.birthdayInput.viewModel = this.currentDate;
      return;
    }
    this.client.birthday = new Date (Date.parse(date));
    console.log(this.client.birthday)
  }

  private navigateBack(): void {
    this.router.navigateByUrl('/clients');
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
    this.isDataReady = true;
  }

  private getId(): string | number {
    return this.route.snapshot.paramMap.get('id');
  }

}
