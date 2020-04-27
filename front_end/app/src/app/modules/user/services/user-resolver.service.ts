import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { User } from '../model/user';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<User> {

  constructor(
    private userService: UserService
  ) { }

  resolve(): Observable<User> {
    return this.userService.getUser();
  }
}
