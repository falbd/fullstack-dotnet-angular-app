import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, MatSnackBarModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule , CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username = ''; password = ''; selectedRole = 'Reader'; roles = ['Reader', 'Writer'];
registerMessage: any;
  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {}
  register() {
    if (!this.username || !this.password || !this.selectedRole) {
      this.registerMessage = 'Please fill out all fields.';
      return;
    }

    this.authService.register(this.username, this.password, [this.selectedRole])
      .then((successMessage: string) => {
        this.registerMessage = ''; 
        this.snackBar.open(successMessage || 'Registration successful! Please login.', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.error('Registration failed:', error);
        this.registerMessage = 'Registration failed. Please try again.';
        this.snackBar.open(`Registration failed: ${error.message || 'Unknown error'}`, 'Close', {
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      });
  }


}
