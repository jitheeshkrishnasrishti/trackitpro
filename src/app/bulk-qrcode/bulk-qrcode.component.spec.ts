import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkQrcodeComponent } from './bulk-qrcode.component';

describe('BulkQrcodeComponent', () => {
  let component: BulkQrcodeComponent;
  let fixture: ComponentFixture<BulkQrcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BulkQrcodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkQrcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
