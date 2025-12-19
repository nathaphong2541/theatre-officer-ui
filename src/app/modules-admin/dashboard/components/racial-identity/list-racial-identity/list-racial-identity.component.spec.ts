import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRacialIdentityComponent } from './list-racial-identity.component';

describe('ListRacialIdentityComponent', () => {
  let component: ListRacialIdentityComponent;
  let fixture: ComponentFixture<ListRacialIdentityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListRacialIdentityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRacialIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
