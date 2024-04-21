import { GetStores200ResponseInner } from '@shared/openapi'

export const getStoresOptions = (stores: GetStores200ResponseInner[]) => {
  return stores.map((store) => ({ value: store.id, label: store.address }))
}
