import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category } from '../../models/dropDown.model';
import { IndexedDbService } from './dropdown-menu.service';

@Component({
  selector: 'dropdown-menu',
  imports: [CommonModule, FormsModule],
  providers: [IndexedDbService],
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
        { id: 'sub2', name: 'Принимают решение', selected: false, color: 'orange' },
        { id: 'sub3', name: 'Успешно', selected: true, color: 'green' },
      ],
    },
    { id: 'cat3', name: 'Сотрудники', selected: false },
    { id: 'cat4', name: 'Партнеры', selected: true },
  ];

  constructor(private IndexedDbService: IndexedDbService) {}

  async ngOnInit(): Promise<void> {
    await this.loadData();
    this.updateSelectionState();
  }

  async loadData() {
    try {
      const data = await this.IndexedDbService.loadData();
      if (data) {
        this.categories = data.categories;
        this.isSelectedAll = data.isSelectedAll;
      }
    } catch (error) {
      console.error('Failed to load data from IndexedDB', error);
    }
  }

  async saveData() {
    try {
      await this.IndexedDbService.saveData({
        categories: this.categories,
        isSelectedAll: this.isSelectedAll,
      });
    } catch (error) {
      console.error('Failed to save data to IndexedDB', error);
    }
  }

  updateSelectionState() {
    this.isSelectedAll = this.categories.some(
      (category) =>
        category.selected ||
        (category.subcategories &&
          category.subcategories.some((sub) => sub.selected))
    );
  }

  toggleSelection(): void {
    const newSelectionState = !this.isSelectedAll;
    this.categories.forEach((category) => {
      category.selected = newSelectionState;
      if (category.subcategories) {
        category.subcategories.forEach(
          (sub) => (sub.selected = newSelectionState)
        );
      }
    });
    this.isSelectedAll = newSelectionState;
  }

  toggleSubCategory(category: Category): void {
    if (category.subcategories) {
      category.expanded = !category.expanded;
    }
  }

  onChangeCheck() {
    this.updateSelectionState()
    this.saveData()
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }
}
