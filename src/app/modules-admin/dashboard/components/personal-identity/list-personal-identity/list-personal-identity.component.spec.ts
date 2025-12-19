import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPersonalIdentityComponent } from './list-personal-identity.component';

describe('ListPersonalIdentityComponent', () => {
  let component: ListPersonalIdentityComponent;
  let fixture: ComponentFixture<ListPersonalIdentityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPersonalIdentityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPersonalIdentityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
