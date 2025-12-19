import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUnionComponent } from './list-union.component';

describe('ListUnionComponent', () => {
  let component: ListUnionComponent;
  let fixture: ComponentFixture<ListUnionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListUnionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListUnionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
