import { Item } from './item.interface';

export interface ReposObject {
  total_count: number;
  incomplete_results: boolean;
  items: Item[];
}