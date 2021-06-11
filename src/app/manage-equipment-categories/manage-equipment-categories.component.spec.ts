import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEquipmentCategoriesComponent } from './manage-equipment-categories.component';

describe('ManageEquipmentCategoriesComponent', () => {
  let component: ManageEquipmentCategoriesComponent;
  let fixture: ComponentFixture<ManageEquipmentCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageEquipmentCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageEquipmentCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
