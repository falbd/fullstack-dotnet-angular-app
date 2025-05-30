import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WalkService } from '../../services/walk.service';
import { RegionService } from '../../services/region.service';
import { DifficultyService } from '../../services/difficulty.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-walks',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './walks.component.html',
  styleUrls: ['./walks.component.css']
})
export class WalksComponent implements OnInit {
  walkForm!: FormGroup;
  isEditMode = false;
  walkId!: string;

  difficulties: any[] = [];
  regions: any[] = [];
walkMessage: any;

  constructor(
    private fb: FormBuilder,
    private walkService: WalkService,
    private regionService: RegionService,
    private difficultyService: DifficultyService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.walkForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      lengthInKm: ['', [Validators.required, Validators.min(0.1)]],
      walkImageUrl: [''],
      difficultyId: ['', Validators.required],
      regionId: ['', Validators.required]
    });

    this.loadRegions();
    this.loadDifficulties();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.walkId = id;
        this.loadWalk(id);
      }
    });
  }

  loadRegions(): void {
    this.regionService.getAllRegions().subscribe(regions => {
      this.regions = regions;
    });
  }

  loadDifficulties(): void {
    this.difficultyService.getAllDifficulties().subscribe(difficulties => {
      this.difficulties = difficulties;
    });
  }

  loadWalk(id: string): void {
    this.walkService.getWalkById(id).subscribe(walk => {
      this.walkForm.patchValue({
        name: walk.name,
        description: walk.description,
        lengthInKm: walk.lengthInKm,
        walkImageUrl: walk.walkImageUrl,
        difficultyId: walk.difficultyId,
        regionId: walk.regionId
      });
    });
  }

  onSubmit(): void {
    if (this.walkForm.invalid) {
      this.walkMessage = 'Please correct the errors in the form.'; // Inline message
      return;
    }

    const walkData = this.walkForm.value;

    if (this.isEditMode) {
      this.walkService.updateWalk(this.walkId, walkData).subscribe({
        next: () => {
          this.walkMessage = '';
          this.snackBar.open('Walk updated successfully!', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
          this.router.navigate(['/dashboard'], { state: { successMessage: 'Walk updated successfully!' } });
        },
        error: (err) => {
          console.error('Update failed:', err);
          this.walkMessage = 'Failed to update walk. Please try again.';
          this.snackBar.open('Failed to update walk.', 'Close', {
            duration: 4000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        }
      });
    } else {
      this.walkService.addWalk(walkData).subscribe({
        next: () => {
          this.walkMessage = '';
          this.snackBar.open('Walk added successfully!', 'Close', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
          this.router.navigate(['/dashboard'], { state: { successMessage: 'Walk added successfully!' } });
        },
        error: (err) => {
          console.error('Add failed:', err);
          this.walkMessage = 'Failed to add walk. Please try again.';
          this.snackBar.open('Failed to add walk.', 'Close', {
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
