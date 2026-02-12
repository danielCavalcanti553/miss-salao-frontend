import { ProductModel } from './product.model';

export interface ProductListResponse {
  storeId: number;
  total: number;
  lastDoc: string | null;
  data: ProductModel[];
}
