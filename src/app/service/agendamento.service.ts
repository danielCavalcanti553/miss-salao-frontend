import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { from, map, Observable, switchMap } from 'rxjs';

export interface Profissional {
  id?: string;
  nome: string;
  especialidade?: string;
  nota?: number;
}

export interface Servico {
  id?: string;
  nome: string;
  minutos: number;
  preco: number;
  profissionais?: Profissional[];
}

export interface Agendamento {
  id?: string;
  clienteNome: string;
  clienteTelefone: string;
  servico: string;
  servicoId?: string;
  profissional?: string;
  profissionalId?: string;
  dataHora: string;
  observacoes?: string;
  status?: 'pendente' | 'confirmado' | 'cancelado';
}

@Injectable({ providedIn: 'root' })
export class AgendamentoService {
  private readonly api = environment.API;

  constructor(private http: HttpClient, private auth: Auth) {}

  listarMeusAgendamentos(): Observable<Agendamento[]> {
    return this.withAuthHeaders().pipe(
      switchMap((headers) => this.http.get<Agendamento[]>(`${this.api}/listarAgendamentos`, { headers }))
    );
  }

  listarServicosAgendados(): Observable<Agendamento[]> {
    return this.withAuthHeaders().pipe(
      switchMap((headers) => this.http.get<Agendamento[]>(`${this.api}/listarServicosAgendados`, { headers }))
    );
  }

  criarAgendamento(payload: Agendamento): Observable<{ id: string; mensagem: string }> {
    return this.withAuthHeaders().pipe(
      switchMap((headers) =>
        this.http.post<{ id: string; mensagem: string }>(`${this.api}/criarAgendamento`, payload, { headers })
      )
    );
  }

  excluirAgendamento(agendamentoId: string): Observable<{ mensagem: string }> {
    return this.withAuthHeaders().pipe(
      switchMap((headers) =>
        this.http.request<{ mensagem: string }>('delete', `${this.api}/excluirAgendamento`, {
          headers,
          body: { agendamentoId }
        })
      )
    );
  }

  cadastrarServico(payload: Servico): Observable<{ id: string; mensagem: string }> {
    return this.withAuthHeaders().pipe(
      switchMap((headers) =>
        this.http.post<{ id: string; mensagem: string }>(`${this.api}/cadastrarServico`, payload, { headers })
      )
    );
  }

  listarServicos(): Observable<Servico[]> {
    return this.withAuthHeaders().pipe(
      switchMap((headers) => this.http.get<Servico[]>(`${this.api}/listarServicos`, { headers }))
    );
  }

  private withAuthHeaders(): Observable<HttpHeaders> {
    const user = this.auth.currentUser;
    if (!user) {
      throw new Error('Usuário não autenticado');
    }

    return from(user.getIdToken()).pipe(map((token) => new HttpHeaders({ Authorization: `Bearer ${token}` })));
  }
}
