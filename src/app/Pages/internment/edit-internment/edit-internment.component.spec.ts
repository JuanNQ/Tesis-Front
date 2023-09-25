import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInternmentComponent } from './edit-internment.component';

describe('EditInternmentComponent', () => {
  let component: EditInternmentComponent;
  let fixture: ComponentFixture<EditInternmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditInternmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditInternmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
