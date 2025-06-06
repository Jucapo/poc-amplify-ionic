import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProspectsListPage } from './prospects-list.page';

describe('ProspectsListPage', () => {
  let component: ProspectsListPage;
  let fixture: ComponentFixture<ProspectsListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProspectsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
