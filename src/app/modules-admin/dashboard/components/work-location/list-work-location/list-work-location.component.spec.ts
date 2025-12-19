import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWorkLocationComponent } from './list-work-location.component';

describe('ListWorkLocationComponent', () => {
  let component: ListWorkLocationComponent;
  let fixture: ComponentFixture<ListWorkLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListWorkLocationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListWorkLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
