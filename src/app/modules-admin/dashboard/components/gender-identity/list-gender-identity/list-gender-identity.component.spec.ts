import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGenderIdentityComponent } from './list-gender-identity.component';

describe('ListGenderIdentityComponent', () => {
  let component: ListGenderIdentityComponent;
  let fixture: ComponentFixture<ListGenderIdentityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListGenderIdentityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListGenderIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
