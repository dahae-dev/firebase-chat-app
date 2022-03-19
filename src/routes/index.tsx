import { Switch, Route, Redirect } from 'react-router-dom';

import Room from 'routes/Room';
import RoomList from 'routes/RoomList';

// ====

const routes = () => (
  <Switch>
    <Route path="/list" component={RoomList} />
    <Route path="/room/:room_id" component={Room} />
    <Redirect from="/" to="/list" />
  </Switch>
);

export default routes;
