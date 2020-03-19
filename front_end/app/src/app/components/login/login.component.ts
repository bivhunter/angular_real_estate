import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from './../../models/user/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  user: User = new User();

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

    this.userService.authorizeUser(this.user).subscribe(
      () => { console.log('login is successfull'); },
      (error) => console.log(error)
    );
  }

}
