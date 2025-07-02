import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ContaService {
  private readonly STORAGE_KEY = 'contas_salvas';

  constructor() {}

  private carregarContas(): any[] {
    const contasJson = localStorage.getItem(this.STORAGE_KEY);
    return contasJson ? JSON.parse(contasJson) : [];
  }

  private salvarContasNoStorage(contas: any[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(contas));
  }

  /**
   * Salva uma nova conta e persiste no localStorage
   */
  salvarContaFake(data: any): Observable<any> {
    const contas = this.carregarContas();
    const novaConta = { ...data, id: contas.length + 1 };
    contas.push(novaConta);
    this.salvarContasNoStorage(contas);

    console.log('📦 Conta salva (com persistência):', novaConta);
    return of({ success: true, id: novaConta.id }).pipe(delay(1000));
  }

  /**
   * Lista as contas salvas do localStorage
   */
  listarContasFake(): Observable<any[]> {
    const contas = this.carregarContas();
    return of(contas).pipe(delay(500));
  }

  /**
   * Apenas para debug: retorna os dados diretamente
   */
  getContasLocalmente(): any[] {
    return this.carregarContas();
  }

  /**
   * [Opcional] Limpa o armazenamento (para testes)
   */
  limparContas() {
    localStorage.removeItem(this.STORAGE_KEY);
    console.log('🧹 Contas removidas do localStorage.');
  }
}
