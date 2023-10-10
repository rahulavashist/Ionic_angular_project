import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoreDetailsPage } from './more-details.page';

describe('MoreDetailsPage', () => {
  let component: MoreDetailsPage;
  let fixture: ComponentFixture<MoreDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MoreDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
