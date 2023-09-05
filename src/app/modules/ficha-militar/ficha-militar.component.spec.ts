import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaMilitarComponent } from './ficha-militar.component';

describe('FichaMilitarComponent', () => {
  let component: FichaMilitarComponent;
  let fixture: ComponentFixture<FichaMilitarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FichaMilitarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaMilitarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
