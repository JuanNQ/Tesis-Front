import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternmentComponent } from './internment.component';

describe('InternmentComponent', () => {
  let component: InternmentComponent;
  let fixture: ComponentFixture<InternmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
