import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../Services/category.service';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css',
})
export class CategoryListComponent implements OnInit {
  private categoryService = inject(CategoryService);
  private getAllCategorySubscribtion?: Subscription;
  categories?: Category[];
  /* categories$?: Observable<Category[]>; */

  ngOnInit(): void {
    /* this.categories$ = this.categoryService.getAllCategories(); */

    this.getAllCategorySubscribtion = this.categoryService
      .getAllCategories()
      .subscribe({
        next: (response) => {
          this.categories = response;
        },
      });
  }
  
  ngOnDestroy(): void {
    this.getAllCategorySubscribtion?.unsubscribe();
  }
}
