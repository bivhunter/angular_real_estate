import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../user/services/user.service';
import { User } from '../../../user/model/user';

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
    // implemented remember me checkbox
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
    if (message === 'Invalid login') {
      this.isCorrectLogin = false;
    }
  }

}
