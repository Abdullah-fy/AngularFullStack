import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule],
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html'
})
export class SuccessModalComponent {
  @Output() onClose = new EventEmitter<void>();
  isVisible = false;
  message: string = 'Product created successfully!';
  show() {
    this.isVisible = true;
  }

  hide() {
    this.isVisible = false;
    this.onClose.emit();
  }
}