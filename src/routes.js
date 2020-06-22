import FeedContainer from "./container/feed/Feed";
import loadData from './helpers/loadData';

const Routes = [
  {
    path: '/',
    exact: true,
    component: FeedContainer,
    loadData: () => loadData('posts')
  }
];

export default Routes;