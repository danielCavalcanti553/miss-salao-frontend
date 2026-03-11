import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgendaProfissionalPage } from './agenda-profissional.page';

describe('AgendaProfissionalPage', () => {
  let component: AgendaProfissionalPage;
  let fixture: ComponentFixture<AgendaProfissionalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaProfissionalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
