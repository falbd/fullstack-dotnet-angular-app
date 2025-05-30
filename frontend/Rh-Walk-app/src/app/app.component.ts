import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { AuthService } from '../app/services/auth.service'; // ✅ Ensure path is correct

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, CommonModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  showToolbar = false;

  constructor(
    private router: Router,
    public authService: AuthService
  ) {
    // Listen to route changes
    this.router.events.subscribe(() => {
      const currentUrl = this.router.url;
      this.showToolbar = currentUrl === '/login' || currentUrl === '/register';
    });
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}

