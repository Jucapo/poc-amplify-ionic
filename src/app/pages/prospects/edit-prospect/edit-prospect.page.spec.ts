import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditProspectPage } from './edit-prospect.page';

describe('EditProspectPage', () => {
  let component: EditProspectPage;
  let fixture: ComponentFixture<EditProspectPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProspectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
