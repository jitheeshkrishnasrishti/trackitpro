import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEquipmentItemsComponent } from './manage-equipment-items.component';

describe('ManageEquipmentItemsComponent', () => {
  let component: ManageEquipmentItemsComponent;
  let fixture: ComponentFixture<ManageEquipmentItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageEquipmentItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageEquipmentItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
