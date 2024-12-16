import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Category {
  id: string;
  name: string;
  selected: boolean;
  expanded?: boolean;
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
  imports: [CommonModule, FormsModule],
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
})
export class ItemSelectorComponent {
  isOpen: boolean = false;
  isSelectedAll: boolean = false;

  categories: Category[] = [
    { id: 'cat1', name: 'Продажи', selected: false },
    {
      id: 'cat2',
      name: 'Неразобранное',
      selected: false,
      expanded: false,
      subcategories: [
        { id: 'sub1', name: 'Переговоры', selected: false, color: 'yellow' },
        {
          id: 'sub2',
          name: 'Принимают решение',
          selected: false,
          color: 'orange',
        },
        { id: 'sub3', name: 'Успешно', selected: true, color: 'green' },
      ],
    },
    { id: 'cat3', name: 'Сотрудники', selected: false },
    { id: 'cat4', name: 'Партнеры', selected: true },
  ];

  ngOnInit(): void {
    this.updateSelectionState();
  }

  updateSelectionState() {
    this.isSelectedAll = !this.categories.every(category => category.selected || (category.subcategories && category.subcategories.every(sub => sub.selected)));
  }

  toggleSelection(): void {
    const newSelectionState = !this.isSelectedAll;
    this.categories.forEach((category) => {
      category.selected = newSelectionState;
      if (category.subcategories) {
        category.subcategories.forEach((sub) => (sub.selected = newSelectionState));
      }
    });
    this.isSelectedAll = newSelectionState;
  }


  toggleSubCategory(category: Category): void {
    if (category.subcategories) {
      category.expanded = !category.expanded;
    }
  }

  hasSelectedItems(): boolean {
    return this.categories.some(category => category.selected ||  
      (category.subcategories && category.subcategories.some(sub => sub.selected)));
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }
}
