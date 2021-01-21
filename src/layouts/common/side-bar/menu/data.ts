export interface Imenu {
    id: string;
    state: string;
    caption: string;
    type: string;
    icon?: string;
    children?: Array<Imenu>;
}

export let Data: Array<Imenu> = [
    {
        id: 'dashboard',
        state: '/main/dashboard',
        caption: 'داشبورد',
        type: 'link',
        icon: 'dashboard',
        children: []
    },
    {
        id: 'products',
        state: '/',
        caption: 'محصولات',
        type: 'sub',
        icon: 'list_alt',
        children: [
            {
                id: 'products_new',
                state: '/main/products/new',
                caption: 'محصول جدید',
                type: 'link',
            },
            {
                id: 'products_list',
                state: '/main/products/list',
                caption: 'لیست محصولات',
                type: 'link',
            },
            {
                id: 'categories',
                state: '/',
                caption: 'دسته‌بندی',
                type: 'sub',
                icon: 'list_alt',
                children: [
                    {
                        id: 'new',
                        state: '/main/products/categories/new',
                        caption: 'دسته جدید',
                        type: 'link',
                    },
                    {
                        id: 'list',
                        state: '/main/products/categories/list',
                        caption: 'لیست دسته بندی ها',
                        type: 'link',
                    },
                ]
            },
        ]
    },
    {
        id: 'general-settings',
        state: '/main/general-settings',
        caption: 'تنظیمات',
        type: 'link',
        icon: 'settings_applications',
        children: []
    },
]
