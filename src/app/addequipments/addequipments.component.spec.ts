import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddequipmentsComponent } from './addequipments.component';

describe('AddequipmentsComponent', () => {
  let component: AddequipmentsComponent;
  let fixture: ComponentFixture<AddequipmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddequipmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddequipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
