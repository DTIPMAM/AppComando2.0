import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentidadeDigitalComponent } from './identidade-digital.component';

describe('IdentidadeDigitalComponent', () => {
  let component: IdentidadeDigitalComponent;
  let fixture: ComponentFixture<IdentidadeDigitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdentidadeDigitalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdentidadeDigitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
