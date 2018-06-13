import RenderAuthorized from '../components/Authorized';
import { getAuthority, getMe } from './authority';

let Me = getMe();
let Authorized = RenderAuthorized(Me.roles.join(",")); // eslint-disable-line

// Reload the rights component
const reloadAuthorized = () => {
  let me = getMe();
  Authorized = RenderAuthorized(me.roles.join(",")); // eslint-disable-line
};

export { reloadAuthorized };
export default Authorized;
