import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/modules/clients/model/client';
import { ClientService } from 'src/app/modules/clients/client.service';
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
  title: string;
  isAddingMode: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private clientService: ClientService
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


  onCancelButtonClick() {
    this.navigateBack();
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
      this.title = "Client's profile";
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
