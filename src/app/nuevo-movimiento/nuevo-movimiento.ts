import { Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface Movimiento {
  tipo: 'Recarga' | 'Gasto';
  monto: number;
}

@Component({
  selector: 'app-nuevo-movimiento',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './nuevo-movimiento.html',
  styleUrl: './nuevo-movimiento.css'
})
export class NuevoMovimientoComponent {

  // Obtenemos el salor del componentes padr -> Billetera
  saldo = input.required<number>();

  // Enviara movimientos validos al padre
  movimientoNuevo = output<Movimiento>();

  // Datos del formulario
  tipo: 'Recarga' | 'Gasto' = 'Gasto';
  monto: number | null = null;

  // validar que el monto sea válido
  get montoValido(): boolean {
    return this.monto !== null &&
      Number.isFinite(this.monto) &&
      this.monto > 0;
  }

  // validar  si el gasto supera el saldo
  get saldoInsuficiente(): boolean {
    return this.tipo === 'Gasto' &&
      this.montoValido &&
      this.monto! > this.saldo();
  }

  // validar si el formulario es válido
  get formularioValido(): boolean {
    return this.montoValido && !this.saldoInsuficiente;
  }

  registrarMovimiento(): void {

    if (!this.formularioValido || this.monto === null) {
      return;
    }

    this.movimientoNuevo.emit({
      tipo: this.tipo,
      monto: this.monto
    });

    //limpiamos el valor monto
    this.monto = null;
  }
}