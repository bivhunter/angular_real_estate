import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client/client';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {


  client: Client = new Client();
  currentDate: Date = new Date();

  constructor(
    private clientService: ClientService,
    private location: Location
  ) { }

  ngOnInit(): void {
  }


  onCancelButtonClick(): void {
    this.backToClientsPage();
  }

  onSubmit(): void {
    this.clientService.addClient(this.client).subscribe(
      () => this.backToClientsPage(),
      (error) => console.log(error)
    );
  }

  private backToClientsPage(): void {
    this.location.back();
  }
}
