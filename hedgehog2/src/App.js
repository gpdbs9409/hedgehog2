"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_router_dom_1 = require("react-router-dom");
var Layout_1 = require("./components/Layout");
var Home_1 = require("./pages/Home");
var Experts_1 = require("./pages/Experts");
var Community_1 = require("./pages/Community");
var Notifications_1 = require("./pages/Notifications");
var Mypage_1 = require("./pages/Mypage");
var Login_1 = require("./pages/Login");
function App() {
    return (<react_router_dom_1.BrowserRouter>
      <react_router_dom_1.Routes>
        <react_router_dom_1.Route path="/" element={<Layout_1.default />}>
          <react_router_dom_1.Route index element={<Home_1.default />}/>
          <react_router_dom_1.Route path="videos" element={<Experts_1.default />}/>
          <react_router_dom_1.Route path="community" element={<Community_1.default />}/>
          <react_router_dom_1.Route path="notifications" element={<Notifications_1.default />}/>
          <react_router_dom_1.Route path="mypage" element={<Mypage_1.default />}/>
          <react_router_dom_1.Route path="login" element={<Login_1.default />}/>
        </react_router_dom_1.Route>
      </react_router_dom_1.Routes>
    </react_router_dom_1.BrowserRouter>);
}
exports.default = App;
