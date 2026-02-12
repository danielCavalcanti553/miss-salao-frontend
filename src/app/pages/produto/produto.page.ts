import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ProductModel } from 'src/app/models/product.model';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.page.html',
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class ProdutoPage implements OnInit {

  produtos: ProductModel[] = [];
  lastDoc?: any;
  loading = false;
  hasMore = true;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.carregarProdutos();
  }

  carregarProdutos(event?: any) {

    if (!this.hasMore) {
      event?.target.complete();
      return;
    }

    this.loading = true;

    this.productService
      .listarProdutos(10, this.lastDoc)
      .subscribe({
        next: (res) => {

          this.produtos = [...this.produtos, ...res.data];
          this.lastDoc = res.lastDoc;

          if (!res.lastDoc || res.data.length === 0) {
            this.hasMore = false;
          }

          this.loading = false;
          event?.target.complete();
        },
        error: (err) => {
          console.error('Erro ao carregar produtos', err);
          this.loading = false;
          event?.target.complete();
        }
      });
  }

  carregarMais(event: any) {
    this.carregarProdutos(event);
  }

}
