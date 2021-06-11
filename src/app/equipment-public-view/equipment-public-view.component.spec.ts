import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentPublicViewComponent } from './equipment-public-view.component';

describe('EquipmentPublicViewComponent', () => {
  let component: EquipmentPublicViewComponent;
  let fixture: ComponentFixture<EquipmentPublicViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentPublicViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentPublicViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
