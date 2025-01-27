import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioCertificatesComponent } from './portfolio-certificates.component';

describe('PortfolioCertificatesComponent', () => {
  let component: PortfolioCertificatesComponent;
  let fixture: ComponentFixture<PortfolioCertificatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PortfolioCertificatesComponent]
    });
    fixture = TestBed.createComponent(PortfolioCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
