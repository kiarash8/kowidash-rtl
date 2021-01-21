import Login from "./components/auth/login";
import Home from "./components/home";
import Product from "./components/products/product";
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
        id: 'products_new',
        path: '/products/new',
        component: Product,
        layout: 'main',
        title: 'محصول جدید'
    },
    {
        id: 'products_list',
        path: '/products/list',
        component: ProductList,
        layout: 'main',
        title: 'لیست محصولات'
    },
    {
        id: 'products_detail',
        path: '/products/detail/:mood/:id',
        component: Product,
        layout: 'main',
        title: 'اطلاعات محصول'
    },
];

export default Routes;