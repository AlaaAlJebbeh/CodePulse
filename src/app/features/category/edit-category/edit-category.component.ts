import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../Services/category.service';
import { Category } from '../models/category.model';
import { UpdateCategoryRequest } from '../models/update-category-request.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css',
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  private categoryService = inject(CategoryService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private paramsSubscribtion?: Subscription;
  private updateCategorySubscribtion?: Subscription;
  private deleteCategorySubscribtion?: Subscription;

  id: string | null = null;
  category?: Category;

  ngOnInit(): void {
    this.paramsSubscribtion = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id'); //same name in the route

        if (this.id) {
          //get data from the API for this category id
          this.categoryService.getCategoryById(this.id).subscribe({
            next: (response) => {
              this.category = response;
            },
          });
        }
      },
    });
  }

  onFormSubmit(): void {
    const updateCategoryRequest: UpdateCategoryRequest = {
      name: this.category?.name ?? '',
      urlHandle: this.category?.urlHandle ?? '',
    };

    if (this.id) {
      this.updateCategorySubscribtion = this.categoryService
        .updateCategory(this.id, updateCategoryRequest)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('/admin/categories');
          },
        });
    }
    //pass this object to the service to handle the update
  }

  onDelete() {
    if (this.id) {
      this.deleteCategorySubscribtion = this.categoryService
        .deleteCategory(this.id)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('/admin/categories');
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.paramsSubscribtion?.unsubscribe();
    this.updateCategorySubscribtion?.unsubscribe();
    this.deleteCategorySubscribtion?.unsubscribe();
  }
}
