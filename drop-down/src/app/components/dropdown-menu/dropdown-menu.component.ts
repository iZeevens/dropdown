import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Category {
  id: string;
  name: string;
  selected: boolean;
  expanded?: boolean;
  disabled?: boolean;
  subcategories?: Subcategory[];
}

interface Subcategory {
  id: string;
  name: string;
  selected: boolean;
  color: string;
}

@Component({
  selector: 'dropdown-menu',
  imports: [CommonModule],
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class ItemSelectorComponent {
  isOpen: boolean = false;

  categories: Category[] = [
    { id: 'cat1', name: 'Продажи', selected: false },
    { id: 'cat2', name: 'Неразобранное', selected: false, expanded: false, subcategories: [
      { id: 'sub1', name: 'Переговоры', selected: false, color: 'yellow' },
      { id: 'sub2', name: 'Принимают решение', selected: false, color: 'orange' },
      { id: 'sub3', name: 'Успешно', selected: false, color: 'green' }
    ]},
    { id: 'cat3', name: 'Сотрудники', selected: false, disabled: true },
    { id: 'cat4', name: 'Партнеры', selected: false },
  ];


  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  toggleSubCategory(category: Category) {
    if (category.subcategories) {
      category.expanded = !category.expanded;
    }
  }

}
