import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class LoginComponent {
  loginData = {
    username: '',
    password: ''
  };

  login() {
    console.log('Login data:', this.loginData);
    // Implement login logic here
  }
}
