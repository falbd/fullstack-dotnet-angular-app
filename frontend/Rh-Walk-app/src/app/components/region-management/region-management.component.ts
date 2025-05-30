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
  templateUrl: './region-management.component.html',
  styleUrls: ['./region-management.component.css'],
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
export class RegionComponent implements OnInit, AfterViewInit {
  userRole = '';
  regionsDataSource = new MatTableDataSource<any>();
  walksDataSource = new MatTableDataSource<any>();

  displayedColumns: string[] = ['name', 'code', 'actions'];
  walksDisplayedColumns: string[] = ['name', 'region', 'length', 'difficulty', 'actions'];

  @ViewChild('walksPaginator') walksPaginator!: MatPaginator;
  @ViewChild('regionsPaginator') regionsPaginator!: MatPaginator;
  @ViewChild('walksSort') walksSort!: MatSort;
  @ViewChild('regionsSort') regionsSort!: MatSort;

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
    this.loadRegions();
  }

  ngAfterViewInit(): void {
    this.regionsDataSource.paginator = this.regionsPaginator;

    this.regionsDataSource.sort = this.regionsSort;
  }

  goToWalks(): void {
    this.router.navigate(['/walks-management']);
  }

  loadRegions(): void {
    this.regionService.getAllRegions().subscribe(regions => {
      this.regionsDataSource.data = regions;
      this.regionsDataSource.sort = this.regionsSort;
    });
  }

  applyRegionFilter(event: Event): void {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.regionsDataSource.filter = value;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goToUploadImage(): void {
    this.router.navigate(['/images/add']);
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  addRegion(): void {
    this.router.navigate(['/regions/add']);
  }

  editRegion(region: any): void {
    this.router.navigate(['/regions/edit', region.id]);
  }

  deleteRegion(region: any): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Region',
        message: `Are you sure you want to delete the region "${region.name}"?`
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.regionService.deleteRegion(region.id).subscribe(() => {
          this.loadRegions();
          this.showSuccessMessage('Region deleted successfully.');
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
