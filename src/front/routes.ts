import About from './views/About'
import Home from './views/Home'
import Portal from './views/Portal'

const routes = [
  {
    path: '/portal',
    component: Portal,
    exact: true,
  },
  {
    path: '/about',
    component: About,
  },
  {
    path: '/',
    component: Home,
  },
]

export default routes
