import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioSkillsListComponent } from './portfolio-skills-list.component';

describe('PortfolioSkillsListComponent', () => {
  let component: PortfolioSkillsListComponent;
  let fixture: ComponentFixture<PortfolioSkillsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PortfolioSkillsListComponent]
    });
    fixture = TestBed.createComponent(PortfolioSkillsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
