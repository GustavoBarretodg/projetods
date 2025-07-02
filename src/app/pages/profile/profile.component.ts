import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Necessário para ngIf, ngFor
import { NavegadorComponent } from '../../components/navegador/navegador.component';
import { CardsComponent } from '../../components/cards/cards.component';
import { ContaService } from '../../services/conta.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  imports: [
    CommonModule,           // ✅ Necessário para *ngIf e *ngFor
    NavegadorComponent,
    CardsComponent
  ]
})
export class ProfileComponent implements OnInit {
  contas: any[] = [];

  constructor(private contaService: ContaService) {}

  ngOnInit() {
    this.contaService.listarContasFake().subscribe((contas) => {
      console.log('📋 Contas salvas:', contas);
      this.contas = contas;
    });
  }

  get primeiroResponsavel(): string {
    return this.contas.length > 0 ? this.contas[0].moradorResponsavel : 'Visitante';
  }
}
