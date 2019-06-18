import Dashboard from "views/Dashboard.jsx";
import VulnerabilityManagement from "views/VulnerabilityManagement.jsx";
import Vulnerability from "views/Vulnerability.jsx";
import connectedhost from "./views/ConnectedHost";
import threatmanagement from "./views/ThreatManagement";
import alertmanagement from "./views/AlertManagement";
import Hostprofile from "./views/Hostprofile";
import MedicalDevices from "./views/MedicalDevices";

import MedicalDeviceProfile from "./views/MedicalDeviceProfile";
import ProtocolUsage from "./views/ProtocolUsage";


/* Router */
import { BrowserRouter, Route } from 'react-router-dom';
import { Component } from "react";




var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    // icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin"
  },

{
  path: "/connected-host",
  name: "Connedted Host",
  rtlName: "الرموز",
  // icon: "tim-icons icon-tv-2",
  component:connectedhost,
  layout: "/admin"
},

{
  path: "/cyber-threats",
  name: "Cyber Threats",
  rtlName: "الرموز",
  // icon: "tim-icons icon-bell-55",
  component:threatmanagement,
  layout: "/admin"
},

{
  path: "/alert-management",
  name: "Alert Management",
  rtlName: "الرموز",
  // icon: "tim-icons icon-alert-circle-exc",
  component:alertmanagement,
  layout: "/admin"
},


{
  path: "/vulnerability",
  name: "Vulnerability",
  rtlName: "طباعة",
  // icon: "tim-icons icon-align-center",
  component: Vulnerability,
  layout: "/admin"
},
{
  path: "/vulnerabilitymanagement",
  name: "Vulnerability Management",
  rtlName: "قائمة الجدول",
  // icon: "tim-icons icon-puzzle-10",
  component: VulnerabilityManagement,
  layout: "/admin"
},




{
  path: "/protocol-usage",
  name: "Protocol Usage",
  rtlName: "الرموز",
  // icon: "tim-icons icon-badge",
  component:ProtocolUsage,
  layout: "/admin"
},

{
  path: "/hostprofile",
  name: "Host Profile",

  // icon: "tim-icons icon-badge",
  component: Hostprofile,
  layout: "/admin"
},
{
  path: "/medical-devices",
  name: "Medical Devices",
  rtlName: "الرموز",
  // icon: "tim-icons icon-badge",
  component: MedicalDevices,
  layout: "/admin"
},







{
  collapse: true,
  name: "Pages",

  
  state: "pagesCollapse",
  views: [

    {
      path: "/medical-devices",
      name: "Medical Devices",
      rtlName: "الرموز",
      // icon: "tim-icons icon-badge",
      component: MedicalDevices,
      layout: "/admin"
    }
  ]
},
];
export default routes;
