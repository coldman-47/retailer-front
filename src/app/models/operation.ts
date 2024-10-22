import { Product } from './product';

export interface Operation {
  id?: number;
  product: Product | number;
  quantity: number;
  price: number;
  created_at?: Date;
  category?: number;
}
