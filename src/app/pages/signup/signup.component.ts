import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ToastrService } from 'ngx-toastr';

interface SignupForm {
  name: FormControl,
  email: FormControl,
  password: FormControl,
  passwordConfirm: FormControl,
  dataNascimento: FormControl,
  descricao: FormControl
}

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    DefaultLoginLayoutComponent,
    ReactiveFormsModule,
    PrimaryInputComponent
  ],
  providers: [
    LoginService
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignUpComponent {
  signupForm!: FormGroup<SignupForm>;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastService: ToastrService
  ) {
    this.signupForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)]),
      dataNascimento: new FormControl('', [Validators.required]),
      descricao: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });
  }

  submit() {
    if (this.signupForm.invalid) {
      this.toastService.error("Preencha todos os campos corretamente.");
      return;
    }

    if (this.signupForm.value.password !== this.signupForm.value.passwordConfirm) {
      this.toastService.error("As senhas não coincidem.");
      return;
    }

    const formData = {
      nome: this.signupForm.value.name,
      email: this.signupForm.value.email,
      senha: this.signupForm.value.password,
      dataNascimento: this.signupForm.value.dataNascimento,
      descricao: this.signupForm.value.descricao
    };

    this.loginService.signUp(formData).subscribe({
      next: () => {
        this.toastService.success("Cadastro realizado com sucesso!");
        this.router.navigate(["/login"]);
      },
      error: () => {
        this.toastService.error("Erro ao cadastrar. Verifique os dados.");
      }
    });
  }

  navigate() {
    this.router.navigate(["/login"]);
  }
}
