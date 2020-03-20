import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from './../../models/user/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();

  isCorrectLogin = true;
  isCheckedRememberMe = false;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {

    this.isCorrectLogin = true;
    if (this.isCheckedRememberMe) {
      localStorage.setItem('rememberMe', 'true');
    }
    this.userService.authorizeUser(this.user).subscribe(
      () => { console.log('login is successfull'); },
      (error) => this.onSubmitError(error)
    );
  }

  onSubmitError(message: string) {
    console.log(message);
    if (message === 'Invalid login') {
      this.isCorrectLogin = false;
    }
  }

}
