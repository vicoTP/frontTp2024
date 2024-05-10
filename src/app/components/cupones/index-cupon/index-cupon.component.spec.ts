import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCuponComponent } from './index-cupon.component';

describe('IndexCuponComponent', () => {
  let component: IndexCuponComponent;
  let fixture: ComponentFixture<IndexCuponComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndexCuponComponent]
    });
    fixture = TestBed.createComponent(IndexCuponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
