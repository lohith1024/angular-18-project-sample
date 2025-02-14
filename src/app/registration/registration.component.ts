import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  standalone: true,
  imports: [FormsModule]
})
export class RegistrationComponent {
  registerData = {
    username: '',
    password: ''
  };

  register() {
    console.log('Registration data:', this.registerData);
    // Implement registration logic here
  }
}
