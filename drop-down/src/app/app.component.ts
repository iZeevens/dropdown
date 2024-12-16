import { Component } from '@angular/core';
import { ItemSelectorComponent } from './components/dropdown-menu/dropdown-menu.component';

@Component({
  selector: 'app-root',
  imports: [ItemSelectorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'drop-down';
}
