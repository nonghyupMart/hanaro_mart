export interface ProductRequest {
  user_cd?: string;
  store_cd: string;
  leaf_cd: string;
  page: number;
  type_val?: TypeValue | "";
}
