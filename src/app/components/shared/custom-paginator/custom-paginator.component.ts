import { Component, input, output } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-custom-paginator',
  standalone: true,
  imports: [MatPaginator],
  templateUrl: './custom-paginator.component.html',
  styleUrl: './custom-paginator.component.scss'
})
export class CustomPaginatorComponent {
  // Input properties
  length = input<number>(0);
  pageSize = input<number>(10);
  pageIndex = input<number>(0);
  pageSizeOptions = input<number[]>([1, 2, 3, 5, 10, 20, 30]);
  showFirstLastButtons = input<boolean>(true);
  disabled = input<boolean>(false);

  // Output events
  pageChange = output<PageEvent>();

  onPageChange(event: PageEvent): void {
    console.log('custom-paginator says: page changed', event);
    this.pageChange.emit(event);
  }
}
