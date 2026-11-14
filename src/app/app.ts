import { Component, signal } from '@angular/core';
import { BilleteraComponent } from './billetera/billetera';

@Component({
  imports: [BilleteraComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
  standalone: true,
})
export class App {
  protected readonly title = signal('billetera-digital');
}
