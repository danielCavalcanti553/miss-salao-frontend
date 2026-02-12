import { MultiLang } from './multi-lang.model';

export interface ProductCategory {
  id: number;

  name: MultiLang;
  description: MultiLang;
  handle: MultiLang;

  parent: ProductCategory | null;
  subcategories: ProductCategory[];

  seo_title: MultiLang;
  seo_description: MultiLang;

  google_shopping_category: string;

  created_at: string;
  updated_at: string;
}
