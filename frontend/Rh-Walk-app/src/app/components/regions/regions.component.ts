import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegionService } from '../../services/region.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // <-- Added this

@Component({
  selector: 'app-regions',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule // <-- Import MatSnackBarModule here
  ],
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.css']
})
export class RegionsComponent implements OnInit {
  regionForm!: FormGroup;
  isEditMode = false;
  regionId!: string;
  regionMessage: string = ''; // Better to have this as string for type safety

  constructor(
    private fb: FormBuilder,
    private regionService: RegionService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar // <-- Inject MatSnackBar here
  ) {}

  ngOnInit(): void {
    this.regionForm = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      regionImageUrl: ['']
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.regionId = id;
        this.loadRegion(id);
      }
    });
  }

  loadRegion(id: string): void {
    this.regionService.getRegionById(id).subscribe(region => {
      this.regionForm.patchValue({
        name: region.name,
        code: region.code,
        regionImageUrl: region.regionImageUrl
      });
    });
  }

  onSubmit(): void {
    if (this.regionForm.invalid) {
      this.regionMessage = 'Please correct the errors in the form.';
      return;
    }

    const regionData = this.regionForm.value;

    if (this.isEditMode) {
      this.regionService.updateRegion(this.regionId, regionData).subscribe({
        next: () => {
          this.regionMessage = '';
          this.snackBar.open('Region updated successfully!', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
          this.router.navigate(['//region-management'], { state: { successMessage: 'Region updated successfully!' } });
        },
        error: (err) => {
          console.error('Update failed:', err);
          this.regionMessage = 'Failed to update region. Please try again.';
          this.snackBar.open('Failed to update region.', 'Close', {
            duration: 4000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        }
      });
    } else {
      this.regionService.addRegion(regionData).subscribe({
        next: () => {
          this.regionMessage = '';
          this.snackBar.open('Region added successfully!', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
          this.router.navigate(['//region-management'], { state: { successMessage: 'Region added successfully!' } });
        },
        error: (err) => {
          console.error('Add failed:', err);
          this.regionMessage = 'Failed to add region. Please try again.';
          this.snackBar.open('Failed to add region.', 'Close', {
            duration: 4000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
