import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from './auth.service';
import { from, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminProdutosService {

  private API = environment.API + "/listarProdutos";

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }


}
