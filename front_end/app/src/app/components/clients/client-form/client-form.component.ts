import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client/client';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {


  client: Client = new Client();
  currentDate: Date = new Date();

  constructor(
    private router: Router,
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
  }


  onCancelButtonClick(): void {
    this.backToClientsPage();
  }

  onSubmit() {
    this.clientService.addClient(this.client).subscribe(
      () => this.backToClientsPage(),
      (error) => console.log(error)
    );
  }

  private backToClientsPage() {
    this.router.navigateByUrl('clients');
  }
}
