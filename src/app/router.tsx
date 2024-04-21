import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Basket } from '@pages/basket'
import { Category } from '@pages/category'
import { NotFound } from '@pages/not-found'
import { Product } from '@pages/product'
import { Root } from '@pages/root'
import { ROUTER_PATHS } from '@shared/routers'

const router = createBrowserRouter([
  {
    path: ROUTER_PATHS.Root,
    Component: Root,
    children: [
      {
        index: true,
        Component: Category,
      },
      {
        path: ROUTER_PATHS.Category,
        Component: Category,
      },
      {
        path: ROUTER_PATHS.Product,
        Component: Product,
      },
      {
        path: ROUTER_PATHS.Basket,
        Component: Basket,
      },
    ],
  },
  {
    path: '*',
    Component: NotFound,
  },
])

export const Router = () => <RouterProvider router={router} />
