import { Component, OnInit } from '@angular/core';
import { User } from './../../models/user/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user: User = new User();
  isAcceptedTerms = false;

  isUniqueEmail = true;

  registration = {
    text: 'If you already registered',
    status: false
  };
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    console.log(this.registration)
  }

  onSubmit(): void {
    console.log(this.user);
    this.isUniqueEmail = true;
    this.userService.registerUser(this.user).subscribe(
      (newUser) => {
        this.registration.text = 'Your registration is successfull';
        this.registration.status = true;
        console.log('Add new User', newUser);
    },
      (error) => this.onSubmitError(error)
    );
  }

  onSubmitError(message: string) {
    console.log(message);
    if (message === 'email must be unique')  {
      this.isUniqueEmail = false;
    }
  }


}
