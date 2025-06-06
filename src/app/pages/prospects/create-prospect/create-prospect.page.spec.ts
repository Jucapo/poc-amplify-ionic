import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateProspectPage } from './create-prospect.page';

describe('CreateProspectPage', () => {
  let component: CreateProspectPage;
  let fixture: ComponentFixture<CreateProspectPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProspectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
