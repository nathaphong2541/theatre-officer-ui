import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderIdentityComponent } from './gender-identity.component';

describe('GenderIdentityComponent', () => {
  let component: GenderIdentityComponent;
  let fixture: ComponentFixture<GenderIdentityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenderIdentityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenderIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
