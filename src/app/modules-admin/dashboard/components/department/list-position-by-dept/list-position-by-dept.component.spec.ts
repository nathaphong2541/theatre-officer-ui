import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPositionByDeptComponent } from './list-position-by-dept.component';

describe('ListPositionByDeptComponent', () => {
  let component: ListPositionByDeptComponent;
  let fixture: ComponentFixture<ListPositionByDeptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPositionByDeptComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPositionByDeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
