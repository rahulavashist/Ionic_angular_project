import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeleteProductPage } from './delete-product.page';

describe('DeleteProductPage', () => {
  let component: DeleteProductPage;
  let fixture: ComponentFixture<DeleteProductPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DeleteProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
