import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemSelectorComponent } from './components/item-selector/item-selector.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ItemSelectorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'drop-down';
}
