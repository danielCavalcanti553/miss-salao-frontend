import { InventoryLevel } from './inventory-level.model';

export interface ProductVariant {
  id: number;
  image_id: number | null;
  product_id: number;
  position: number;

  price: string;
  price_without_taxes: string | null;
  compare_at_price: string | null;
  promotional_price: string | null;

  stock_management: boolean;
  stock: number;

  weight: string | null;
  width: string | null;
  height: string | null;
  depth: string | null;

  sku: string | null;

  barcode: string | null;
  mpn: string | null;

  visible: boolean;

  values: any[];

  created_at: string;
  updated_at: string;

  cost: string | null;

  inventory_levels: InventoryLevel[];
}
