import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Inventory } from '../../../../_models/Inventory';
import { BranchService } from '../../../../_services/branch.service';

@Component({
  selector: 'app-internal-order',
  imports:[CommonModule,FormsModule],
  templateUrl: './internal-order.component.html',
  styleUrls: ['./internal-order.component.css'],
})
export class InternalOrderComponent implements OnInit{
  order = {
    productId: '',
    quantity: 0,
    from: '67aa6cd7e6a010a2eea94349',
    To: '',
  };

    constructor(private branchesservice:BranchService){}
  branch:Inventory |null =null;

  ngOnInit(): void {
    this.branch=history.state.branch;
    console.log(this.branch)
  }

  // Handle form submission
  onSubmit(): void {
    if (this.isFormValid()) {
      this.order.To=this.branch!.branchId;
      console.log(this.order);
      this.branchesservice.setInternalorder(this.order).subscribe(
        (response) => {
          console.log('Order submitted successfully:', response);
          // Handle success (e.g., show a success message)
        },
        (error) => {
          console.error('Error submitting order:', error);
          // Handle error (e.g., show an error message)
        }
      );
      this.resetForm(); // Reset the form after submission
    } else {
      console.log('Form is invalid');
    }
  }

  // Check if the form is valid
  isFormValid(): boolean {
    return (
      this.order.productId.trim() !== '' &&
      this.order.quantity > 0
    );
  }

  // Reset the form
  resetForm(): void {
    this.order = {
      productId: '',
      quantity: 0,
      from: 'MainBranch',
      To: "",
    };
  }
}
