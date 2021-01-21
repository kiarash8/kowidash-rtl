import Login from "./components/auth/login";
import Home from "./components/home";
import ProductList from "./components/products/product-list";

interface Route {
    id: string;
    title: string;
    path: string;
    component: any;
    layout: string;
}
  
const Routes: Array<Route> = [
    {
        id: 'login',
        title: '',
        path: '/login',
        component: Login,
        layout: 'auth'
    },
    {
        id: 'dashboard',
        title: 'داشبورد',
        path: '/dashboard',
        component: Home,
        layout: 'main'
    },
    {
        id: 'products_list',
        path: '/products/list',
        component: ProductList,
        layout: 'main',
        title: 'لیست محصولات'
    },
];

export default Routes;