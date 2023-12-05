import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./Page/home/home.module').then( m => m.HomePageModule)
  },

  {
    path: 'moreDetails/:id',
    loadChildren: () => import('./Page/more-details/more-details.module').then( m => m.MoreDetailsPageModule)
  },
  {
    path: 'addProduct',
    loadChildren: () => import('./Page/add-product/add-product.module').then( m => m.AddProductPageModule)
  },
  {
    path: 'updateProduct',
    loadChildren: () => import('./Page/update-product/update-product.module').then( m => m.UpdateProductPageModule)
  },
  {
    path: 'deleteProduct',
    loadChildren: () => import('./Page/delete-product/delete-product.module').then( m => m.DeleteProductPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./Page/pagenotfound/pagenotfound.module').then( m => m.PagenotfoundPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
