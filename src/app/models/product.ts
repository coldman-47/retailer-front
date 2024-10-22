export interface Product {
  id: number;
  name: string;
  stock: number;
  sale: boolean;
  sale_percentage: number;
  price: number;
  discount: number;
  edit: boolean;
  unit_sold: number;
  comments: string;
  category: number;
  op?: string;
  quantity?: number;
}
