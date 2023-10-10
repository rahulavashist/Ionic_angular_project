import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagenotfoundPage } from './pagenotfound.page';

describe('PagenotfoundPage', () => {
  let component: PagenotfoundPage;
  let fixture: ComponentFixture<PagenotfoundPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PagenotfoundPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
