import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ProductService} from '../../_services/product.service';
import { MatDialogRef } from '@angular/material/dialog';
import {Product} from '../../_models/product';
import { SuccessModalComponent } from '../success-modal/success-modal.component';


@Component({
  selector: 'app-form-dialog',
  imports: [ReactiveFormsModule,CommonModule,SuccessModalComponent],
  templateUrl: './form-dialog.component.html',
  styleUrl: './form-dialog.component.css'
})
export class FormDialogComponent {
  productForm: FormGroup;
  selectedFile: File | null = null;
  uploadProgress = 0;
  isSubmitting = false;

  @ViewChild(SuccessModalComponent) successModal!: SuccessModalComponent;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private dialogRef: MatDialogRef<FormDialogComponent> 
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      category: ['', Validators.required],
      stockQuantity: [null, [Validators.required, Validators.min(1)]], 
    });
  }


  //
  get nameControl() { return this.productForm.get('name'); }
get priceControl() { return this.productForm.get('price'); }
get descriptionControl() { return this.productForm.get('description'); }
get categoryControl() { return this.productForm.get('category'); }
get stockQuantityControl() { return this.productForm.get('stockQuantity'); }

onFileSelected(event: any) {
  this.selectedFile = event.target.files[0];
  this.fileTouched = true;
}

generateUniqueId(): string {
  return `id-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}


  onSubmit() {
    if (this.productForm.valid && this.selectedFile) {
      this.isSubmitting = true;

     //
  this.fileTouched = true;

      if (this.productForm.invalid) {
        console.error('Form is invalid', this.productForm.errors);
        return;
      }
      
      const formData = new FormData();

      
      // Append product data
      Object.keys(this.productForm.value).forEach(key => {
        formData.append(key, this.productForm.value[key]);
      });

      console.log('Form Values:', this.productForm.value);

      const sellerInfo: any = {
        id: '1',
        name: 'john' 
      };

      // Append image file
      formData.append('images', this.selectedFile, this.selectedFile.name);
      formData.append('sellerInfo', JSON.stringify(sellerInfo));
      let id:string=this.generateUniqueId();
      formData.append('_id', id);


      console.log('Submitting:', formData); 
      console.log('FormData keys:', [...formData.keys()]); 

      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]); 
      }
      

      this.productService.addProduct(formData).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          // Handle success
          //this.successModal.show(); 
         // setTimeout(() => {
            this.dialogRef.close(this.productForm.value);
         // }, 2000);
        },
        error: (error) => {
          this.isSubmitting = false;
          console.log(error);
          // Handle error
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
    }
  }

  closeDialog() {
    this.dialogRef.close(); 
  }

  fileTouched = false;
  //success product creation modal 
  handleModalClose() {
    console.log('Modal closed');
  }
 
  
}
