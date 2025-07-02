import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormArray
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DefaultContaLayoutComponent } from '../../components/default-conta-layout/default-conta-layout.component';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { ContaService } from '../../services/conta.service';

@Component({
  selector: 'app-conta',
  standalone: true,
  templateUrl: './conta.component.html',
  styleUrl: './conta.component.scss',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DefaultContaLayoutComponent,
    PrimaryInputComponent
  ]
})
export class ContaComponent {
  constructor(private contaService: ContaService, private router: Router) {}

  // 🔹 Inicializa o FormArray de moradores
  moradores = new FormArray([
    new FormGroup({
      nome: new FormControl('', Validators.required),
      valor: new FormControl('', Validators.required),
      tipo: new FormControl('Pago')
    })
  ]);

  // 🔹 Define o formulário principal
  contaForm = new FormGroup({
    moradorResponsavel: new FormControl('', Validators.required),
    situacaoConta: new FormControl('Pendente'),
    vencimento: new FormControl('', Validators.required),
    valor: new FormControl('', Validators.required),
    tipo: new FormControl('Aluguel'),
    observacao: new FormControl(''),
    moradores: this.moradores
  });

  // 🔹 Adiciona novo morador ao FormArray
  addMorador() {
    this.moradores.push(
      new FormGroup({
        nome: new FormControl('', Validators.required),
        valor: new FormControl('', Validators.required),
        tipo: new FormControl('Pago')
      })
    );
  }

  // 🔹 Submete os dados simulando envio à API fake
  submit() {
    if (this.contaForm.invalid) {
      console.warn('❌ Formulário inválido.');
      return;
    }

    this.contaService.salvarContaFake(this.contaForm.value).subscribe({
      next: (res) => {
        console.log('✅ Conta cadastrada com sucesso:', res);
        this.router.navigate(['/profile']);
      },
      error: (err) => {
        console.error('❌ Erro ao cadastrar conta:', err);
      }
    });
  }
}
