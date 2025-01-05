import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'
import Fallback from '~/components/fall-back'

const Problem2Component = lazy(() => import('~/problem2'))

const Routes = () => {
  const routes = useRoutes([
    {
      children: [
        {
          path: '/problem-2',
          element: (
            <Fallback>
              <Problem2Component />
            </Fallback>
          )
        }
      ]
    }
  ])
  return routes
}

export default Routes
