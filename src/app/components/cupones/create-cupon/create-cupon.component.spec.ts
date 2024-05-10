import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCuponComponent } from './create-cupon.component';

describe('CreateCuponComponent', () => {
  let component: CreateCuponComponent;
  let fixture: ComponentFixture<CreateCuponComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateCuponComponent]
    });
    fixture = TestBed.createComponent(CreateCuponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
