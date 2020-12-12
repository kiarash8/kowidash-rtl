import Login from "./components/auth/login";
import Home from "./components/home";

interface Route {
    path: string;
    component: any;
    layout: string;
}
  
const Routes: Array<Route> = [
    {
        path: '/login',
        component: Login,
        layout: 'auth'
    },
    {
        path: '/dashboard',
        component: Home,
        layout: 'main'
    },
];

export default Routes;