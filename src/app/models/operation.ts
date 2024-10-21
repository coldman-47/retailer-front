import { Product } from './product';

export interface Operation {
  id?: number;
  product: Product | number;
  quantity: number;
  price: number;
  createdAt?: Date;
  category?: number;
}
