import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagerFilterComponent } from './pager-filter.component';

describe('PagerFilterComponent', () => {
  let component: PagerFilterComponent;
  let fixture: ComponentFixture<PagerFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagerFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagerFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
