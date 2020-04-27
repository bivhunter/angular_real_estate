import { Component, OnInit } from '@angular/core';
import { User } from '../../../user/model/user';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  user: User = new User();
  isAcceptedTerms = false;

  isUniqueEmail = true;

  // change view after registration
  registration = {
    text: 'If you already registered',
    status: false
  };
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.isUniqueEmail = true;
    this.userService.registerUser(this.user).subscribe(
      (newUser) => {
        this.registration.text = 'Your registration is successfull';
        this.registration.status = true;
    },
      (error) => this.onSubmitError(error)
    );
  }

  onSubmitError(message: string) {
    if (message === 'email must be unique')  {
      this.isUniqueEmail = false;
    }
  }
}
