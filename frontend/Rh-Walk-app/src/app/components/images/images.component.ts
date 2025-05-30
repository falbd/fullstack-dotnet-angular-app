import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ImageService } from '../../services/image.service';

// Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-images',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent {
  selectedFile: File | null = null;
  fileName = '';
  fileDescription = '';

  constructor(private imageService: ImageService , private router: Router) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile && !this.fileName) {
      this.fileName = this.selectedFile.name;
    }
  }

  uploadImage() {
    if (this.selectedFile && this.fileName) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('fileName', this.fileName);
      formData.append('fileDescription', this.fileDescription);

      this.imageService.uploadImage(formData).subscribe(() => {
        alert('Upload successful!');
        this.resetForm();
      });
    }
  }

  resetForm() {
    this.selectedFile = null;
    this.fileName = '';
    this.fileDescription = '';
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}


