import { Injectable } from '@angular/core';
import { FormValidationService } from './form-validation.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadPhotoService {
  selectedFile: File | undefined;
  fileName: string = '';

  constructor(private http: HttpClient, private formValidation: FormValidationService) { }

  uploadPhoto(event: Event, userId: string): void {
    event.preventDefault();
  
    if (this.selectedFile) {
      if (this.formValidation.photo(this.selectedFile)) {
        const formData = new FormData();
        formData.append('photo', this.selectedFile, this.fileName);
  
        this.http.put(`/img/profile/${userId}`, formData)
        .subscribe(response => {
          console.log('Upload successful', response);
        }, error => {
          console.error('Upload failed', error);
        });
      } else {
        console.log('Datei ist ungültig');
      }
    }
  }
}
