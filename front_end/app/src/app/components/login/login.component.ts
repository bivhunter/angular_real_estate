import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const userData = {
      email: this.email,
      password: this.password
    };
    this.userService.authorization(userData).subscribe(
      (token) => {
        console.log(token);
        localStorage.setItem('token', token);
      },
      (error) => console.log(error)
    );
  }

}
