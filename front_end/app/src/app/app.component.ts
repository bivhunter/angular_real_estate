import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit(): void {
    console.log('init');
    this.doRememberMe();
  }

  doRememberMe(): void {
    const isRememberMe = localStorage.getItem('rememberMe');
    if (!isRememberMe) {
      localStorage.removeItem('authToken');
    }
  }

}
