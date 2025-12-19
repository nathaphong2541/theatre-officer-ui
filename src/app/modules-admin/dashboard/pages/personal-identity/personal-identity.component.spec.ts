import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalIdentityComponent } from './personal-identity.component';

describe('PersonalIdentityComponent', () => {
  let component: PersonalIdentityComponent;
  let fixture: ComponentFixture<PersonalIdentityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonalIdentityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
