import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dropdown-menu',
  imports: [CommonModule],
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class ItemSelectorComponent {
  isOpen: boolean = false;

  toggleDropdown() {
    this.isOpen = !this.isOpen;

  }
}
