import { Home, Statistics, Measure, Usage } from "@/pages";

export const routes = [
  {
    name: "home",
    path: "/home",
    element: <Home />,
  },
  {
    name: "Measure",
    path: "/measure",
    element: <Measure />,
  },
  {
    name: "Statistics",
    path: "/statistics",
    element: <Statistics />,
  },
  {
    name: "Usage",
    path: "/usage",
    element: <Usage />,
  }
];

export default routes;
