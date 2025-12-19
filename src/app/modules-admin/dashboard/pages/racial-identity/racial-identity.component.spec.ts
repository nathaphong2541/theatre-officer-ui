import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RacialIdentityComponent } from './racial-identity.component';

describe('RacialIdentityComponent', () => {
  let component: RacialIdentityComponent;
  let fixture: ComponentFixture<RacialIdentityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RacialIdentityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RacialIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
