import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfissionaisPage } from './profissionais.page';

describe('ProfissionaisPage', () => {
  let component: ProfissionaisPage;
  let fixture: ComponentFixture<ProfissionaisPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfissionaisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
