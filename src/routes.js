import Drinks from 'components/Drinks/drinks';
import NotFound from 'components/NotFound/notFound';

const routes = [
  {
    path: '/',
    component: Drinks
  },
  {
    path: '*',
    component: NotFound
  }
];

export default routes;
