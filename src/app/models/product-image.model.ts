export interface ProductImage {
  id: number;
  product_id: number;
  src: string;
  position: number;

  alt: string[];
  height: number;
  width: number;

  thumbnails_generated: number;

  created_at: string;
  updated_at: string;
}
