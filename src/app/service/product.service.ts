import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ProductListResponse } from '../models/product-list-response.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly API = `${environment.API}/produtoListar`;

  constructor(private http: HttpClient) { }

  /**
   * Lista produtos paginados
   */
  listarProdutos(limit: number = 20, lastDoc?: string): Observable<ProductListResponse> {

    let params = new HttpParams()
      .set('limit', limit.toString());

    if (lastDoc) {
      params = params.set('lastDoc', lastDoc);
    }

    return this.http.get<ProductListResponse>(this.API, { params });
  }
}
