import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListExperienceLevelComponent } from './list-experience-level.component';

describe('ListExperienceLevelComponent', () => {
  let component: ListExperienceLevelComponent;
  let fixture: ComponentFixture<ListExperienceLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListExperienceLevelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListExperienceLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
