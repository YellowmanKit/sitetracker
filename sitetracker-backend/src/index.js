import "babel-core/register";
import "babel-polyfill";

import CreateApp from './main/createApp.js';
//const app = new CreateApp('sitetracker', 80, false, true, false);
const app = new CreateApp('sitetracker', 443, true, true, false);
//const app = new CreateApp('sitetracker', 3000, false, false, false);
export default app;
