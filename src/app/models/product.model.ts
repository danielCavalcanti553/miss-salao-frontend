import { MultiLang } from './multi-lang.model';
import { ProductImage } from './product-image.model';
import { ProductVariant } from './product-variant.model';
import { ProductCategory } from './product-category.model';
import { FirestoreTimestamp } from './firestore-timestamp.model';

export interface ProductModel {
  id: number;

  has_stock: boolean;
  free_shipping: boolean;
  requires_shipping: boolean;

  created_at: string;
  updated_at: string;

  name: MultiLang;
  description: MultiLang;
  handle: MultiLang;

  images: ProductImage[];
  variants: ProductVariant[];

  canonical_url: string;

  seo_title: MultiLang;
  seo_description: MultiLang;

  tags: string;
  video_url: string | null;

  attributes: any[];
  brand: string | null;

  categories: ProductCategory[];

  updatedAtSync?: FirestoreTimestamp;
}
