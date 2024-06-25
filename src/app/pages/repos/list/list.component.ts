import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MaterialsModule } from '../../../core/shared/materials.module';
import { Item } from '../../../core/interfaces/item.interface';

@Component({
  standalone: true,
  imports: [CommonModule, RouterLink, MaterialsModule],
  selector: 'data-list',
  templateUrl: './list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReposListComponent {
  private repos: Item[] | undefined;
  isAsc: boolean = true;

  @Input()
  set data(value: any) {
    this.repos = value;
    this.cdr.markForCheck(); 
  }

  get data(): any {
    return this.repos;
  }

  constructor(private cdr: ChangeDetectorRef) {}

  
  _sortTable(isAsc: boolean): void {
    this.data.sort((a: any, b: any) => (a.created_at == b.created_at) ? 0 : (a.created_at < b.created_at ? -1 : 1) * (isAsc ? 1 : -1));
    this.isAsc = !this.isAsc;
}


}