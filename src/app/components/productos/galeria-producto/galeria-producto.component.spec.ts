import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleriaProductoComponent } from './galeria-producto.component';

describe('GaleriaProductoComponent', () => {
  let component: GaleriaProductoComponent;
  let fixture: ComponentFixture<GaleriaProductoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GaleriaProductoComponent]
    });
    fixture = TestBed.createComponent(GaleriaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
