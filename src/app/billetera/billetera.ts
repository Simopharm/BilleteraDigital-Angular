import { Component } from '@angular/core';

import {
  NuevoMovimientoComponent,
  Movimiento
} from '../nuevo-movimiento/nuevo-movimiento';

interface MovimientoRegistrado extends Movimiento {
  id: number;
}
@Component({
  selector: 'app-billetera',
  standalone: true,
  imports: [NuevoMovimientoComponent],
  templateUrl: './billetera.html',
  styleUrl: './billetera.css'
})
export class BilleteraComponent {

  saldo: number = 250;
  movimientos: MovimientoRegistrado[] = [];

  registrarMovimiento(movimiento: Movimiento): void {

    if (!Number.isFinite(movimiento.monto) ||
      movimiento.monto <= 0) {
      return;
    }

    if (movimiento.tipo === 'Gasto') {

      if (movimiento.monto > this.saldo) {
        return;
      }

      this.saldo -= movimiento.monto;

    } else if (movimiento.tipo === 'Recarga') {

      this.saldo += movimiento.monto;

    } else {
      return;
    }

    this.saldo = Math.round(this.saldo * 100) / 100;

    this.movimientos.unshift({
      id: Date.now(),
      tipo: movimiento.tipo,
      monto: movimiento.monto
    });
  }
}