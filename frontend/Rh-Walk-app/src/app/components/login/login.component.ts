import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatSnackBarModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule , CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = ''; password = '';
loginMessage: any;
  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {}
  login() {
    if (!this.username || !this.password) {
      this.loginMessage = 'Please fill out all fields.'; // Optional inline message
      return;
    }

    this.authService.login(this.username, this.password).then(response => {
      if (response.jwtToken) {
        this.authService.setToken(response.jwtToken);
        const decoded = this.authService.getDecodedToken();
        console.log('Decoded JWT after login:', decoded); // Debug roles

        this.snackBar.open('Login successful', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
        this.router.navigate(['/dashboard']);
      } else {
        this.loginMessage = 'Login failed. Please check your credentials.'; // Inline fallback
        this.snackBar.open('Login failed', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      }
    }).catch(err => {
      console.error('Login error:', err);
      this.loginMessage = 'An error occurred. Please try again.'; // Inline fallback
      this.snackBar.open('Login failed', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
    });
  }


  goToRegister(): void {
    this.router.navigate(['/register']);
  }


}

