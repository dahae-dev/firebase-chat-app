import { Switch, Route, Redirect } from 'react-router-dom';

import ChatRoom from 'routes/ChatRoom';
import ChatRoomList from 'routes/ChatRoomList';

// ====

const routes = () => (
  <Switch>
    <Route path="/list" component={ChatRoomList} />
    <Route path="/room/:room_id" component={ChatRoom} />
    <Redirect from="/" to="/list" />
  </Switch>
);

export default routes;
