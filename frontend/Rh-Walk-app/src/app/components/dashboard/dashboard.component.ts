import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../services/auth.service';
import { WalkService } from '../../services/walk.service';
import { RegionService } from '../../services/region.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    MatSortModule
  ]
})
export class DashboardComponent implements OnInit, AfterViewInit {
  userRole = '';
  regionsDataSource = new MatTableDataSource<any>();
  walksDataSource = new MatTableDataSource<any>();

  walksDisplayedColumns: string[] = ['name', 'region', 'length', 'difficulty', 'actions'];

  @ViewChild('walksPaginator') walksPaginator!: MatPaginator;
  @ViewChild('walksSort') walksSort!: MatSort;

  constructor(
    private authService: AuthService,
    private walkService: WalkService,
    private regionService: RegionService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userRole = this.authService.getUserRoles().join(', ') || 'Unknown';
    this.loadWalks();

  }

  ngAfterViewInit(): void {
    this.walksDataSource.paginator = this.walksPaginator;

    // Optional: Set sorting if needed
    this.walksDataSource.sort = this.walksSort;
  }

  loadWalks(): void {
    this.walkService.getAllWalks().subscribe(walks => {
      this.walksDataSource.data = walks;
      this.walksDataSource.sort = this.walksSort;
    });
  }

  applyWalkFilter(event: Event): void {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.walksDataSource.filter = value;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  addWalk(): void {
    this.router.navigate(['/walks/add']);
  }

  goToUploadImage(): void {
    this.router.navigate(['/images/add']);
  }

  editWalk(walk: any): void {
    this.router.navigate(['/walks/edit', walk.id]);
  }

  goToRegion(): void {
    this.router.navigate(['/region-management']);
  }



  deleteWalk(walk: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Walk',
        message: `Are you sure you want to delete the walk "${walk.name}"?`
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.walkService.deleteWalk(walk.id).subscribe(() => {
          this.loadWalks();
          this.showSuccessMessage('Walk deleted successfully.');
        });
      }
    });
  }

  showSuccessMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }
}

