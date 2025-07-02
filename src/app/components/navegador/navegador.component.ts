import { Input, Output, EventEmitter, Component } from '@angular/core';
import { NgIf } from '@angular/common'; // ✅ Importar NgIf


@Component({
  selector: 'app-navegador',
  standalone: true,
  imports: [NgIf],
  templateUrl: './navegador.component.html',
  styleUrls: ['./navegador.component.scss']  // Corrigido aqui
})
export class NavegadorComponent {
  @Input() title: string = "";
  @Input() title2: string = "";
  @Input() primaryBtnText: string = "";
  @Input() secondaryBtnText: string = "";
  @Input() disablePrimaryBtn: boolean = true;

  @Output() submit = new EventEmitter<'primary' | 'secondary'>(); // Tipado para identificar origem
  @Output("navigate") onNavigate = new EventEmitter();

  submitPrimary() {
    this.submit.emit('primary');
  }

  submitSecondary() {
    this.submit.emit('secondary');
  }

  navigate() {
    this.onNavigate.emit();
  }
}
