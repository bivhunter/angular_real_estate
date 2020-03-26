import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../model/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();

  isCorrectLogin = true;
  isCheckedRememberMe = true;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.isCorrectLogin = true;
    if (this.isCheckedRememberMe) {
      localStorage.setItem('rememberMe', 'true');
    } else {
      localStorage.setItem('rememberMe', 'false');
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
