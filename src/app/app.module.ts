import { NgModule } from '@angular/core';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { AppComponent } from './app.component';
import { provideRouter, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AddCategoryComponent,
    EditCategoryComponent,
  ],
  bootstrap: [AppComponent],
  imports: [
    RouterModule,
    FormsModule,
    RouterOutlet,
    BrowserModule,
    CommonModule,
  ],
  providers: [provideHttpClient(), provideRouter(routes)],
})
export class AppModule {}
