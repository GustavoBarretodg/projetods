import { Component } from '@angular/core';
import { NavegadorComponent } from '../../components/navegador/navegador.component';

@Component({
  selector: 'app-meu-perfil',
  standalone: true,
  imports: [NavegadorComponent],
  templateUrl: './meu-perfil.component.html',
  styleUrls: ['./meu-perfil.component.scss']
})
export class MeuperfilComponent {
  usuario = {
    nome: 'Gustavo Barreto',
    email: 'gmichel148@gmail.com',
    cpf: '132.662.026-60',
    telefone: '(33) 98803-3411'
  };

  alterarSenha() {
    // lógica para alterar senha
  }

  salvar() {
    // lógica de salvar
  }

  desativarConta() {
    // lógica para desativar conta
  }
}
