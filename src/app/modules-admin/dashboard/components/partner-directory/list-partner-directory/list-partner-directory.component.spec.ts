import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPartnerDirectoryComponent } from './list-partner-directory.component';

describe('ListPartnerDirectoryComponent', () => {
  let component: ListPartnerDirectoryComponent;
  let fixture: ComponentFixture<ListPartnerDirectoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPartnerDirectoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPartnerDirectoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
