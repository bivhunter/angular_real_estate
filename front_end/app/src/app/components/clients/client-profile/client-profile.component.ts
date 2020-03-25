import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/models/client/client';
import { ClientService } from 'src/app/services/client.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit {

  client: Client;
  currentDate: Date = new Date();
  isDataReady = false;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    this.getClient();
  }

  onSubmit(): void {
    this.clientService.updateClient(this.client).subscribe(
      () => this.navigateBack(),
      (error) => console.log(error)
    );
  }

  onCancelButtonClick() {
    this.navigateBack();
  }

  private navigateBack(): void {
    this.location.back();
  }

  private getClient(): void {
    const id = this.getId();
    this.clientService.getClient(id).subscribe(
      (client) => this.onGetClient(client),
      (error) => console.log(error)
    );
  }

  private onGetClient(client: Client): void {
    this.client = client;
    this.isDataReady = true;
  }

  private getId(): string | number {
    return this.route.snapshot.paramMap.get('id');
  }

}
