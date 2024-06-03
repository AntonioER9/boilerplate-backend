import type { Order } from 'common/types/order.type';
import type { Product } from 'common/types/product.type';

export const isSkuMkp = (sku: string): boolean => {
  return sku.startsWith('MK');
};

export const isProductMkp = (product: Product): boolean => {
  if (typeof product.isMkp === 'boolean') return product.isMkp;
  return isSkuMkp(product.code || '');
};

export const isOrderMkp = (order: Order): boolean => {
  if (order.items.length > 0) {
    const mkpItems = order.items.filter((product: Product) => isProductMkp(product));
    return mkpItems.length > 0;
  }
  return false;
};
