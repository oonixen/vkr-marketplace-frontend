enum ROUTER {
  Root = '/',
  Category = 'category/:categoryName',
  Product = 'product/:productId',
  Basket = 'basket',
}

export enum ROUTER_PATHS {
  Root = ROUTER.Root,
  Category = `${ROUTER.Root}${ROUTER.Category}`,
  Product = `${ROUTER.Root}${ROUTER.Product}`,
  Basket = `${ROUTER.Root}${ROUTER.Basket}`,
}
