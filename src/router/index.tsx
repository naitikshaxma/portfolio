import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Landing from '@/views/Landing'
import NotFound from '@/views/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
