import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminProdutosPage } from './admin-produtos.page';

describe('AdminProdutosPage', () => {
  let component: AdminProdutosPage;
  let fixture: ComponentFixture<AdminProdutosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProdutosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
