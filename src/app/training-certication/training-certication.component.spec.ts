import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingCerticationComponent } from './training-certication.component';

describe('TrainingCerticationComponent', () => {
  let component: TrainingCerticationComponent;
  let fixture: ComponentFixture<TrainingCerticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingCerticationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingCerticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
