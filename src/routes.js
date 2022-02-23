/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Health from "views/Health";
import Mobility from "views/Mobility.js";
import ViewWeather from "views/ViewWeather.js";
import ViewTwitter from "views/ViewTwitter.js";
import ViewEnvironement from "views/ViewEnvironment.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/weather",
    name: "Météo",
    icon: "nc-icon nc-sun-fog-29",
    component: ViewWeather,
    layout: "/admin",
  },
  {
    path: "/mobility",
    name: "Mobilité",
    icon: "nc-icon nc-bus-front-12",
    component: Mobility,
    layout: "/admin",
  },
  {
    path: "/environement",
    name: "Environnement",
    icon: "nc-icon nc-world-2",
    component: ViewEnvironement,
    layout: "/admin",
  },
  {
    path: "/health",
    name: "Santé",
    icon: "nc-icon nc-ambulance",
    component: Health,
    layout: "/admin",
  },
  {
    path: "/twitter",
    name: "Twitter",
    icon: "nc-icon nc-globe",
    component: ViewTwitter,
    layout: "/admin",
  }
];
export default routes;
