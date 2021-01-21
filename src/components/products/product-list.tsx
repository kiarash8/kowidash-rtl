import React from 'react';
import DataGrid from '../data-grid';
import { Column } from '../data-grid/model';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';

const ProductList: React.FC = () => {

  const columns: Column[] = [
    {
      id: 'id',
      label: 'کد محصول',
      sort: true,
      minWidth: 120,
      filter: 'text'
    },
    {
      id: 'name',
      label: 'نام',
      sort: true,
      minWidth: 250,
      filter: 'text'
    },
    {
      id: 'category',
      label: 'دسته بندی',
      sort: true,
      minWidth: 250,
      filter: 'select',
      filterOption: [
        {key: 1, value: 'دسته ۱'},
        {key: 2, value: 'دسته ۲'},
        {key: 3, value: 'دسته ۳'},
      ],
    },
    {
      id: 'status',
      label: 'وضعیت',
      sort: false,
      minWidth: 170,
      filter: 'select',
      filterOption: [
        {key: 'true', value: 'پیش نویس'},
        {key: 'false', value: 'منتشر شده'},
      ],
      format: (value: boolean) =>  value === true
      ? 'پیش نویس'
      : 'منتشر شده',
    },
    {
      id: 'manage',
      label: '',
      sort: false,
      minWidth: 250,
      filter: 'none',
      actions: [
        {
          type: 'link',
          button:{
            variant: 'outlined',
            color: 'primary',
            caption: <CreateIcon />,
          },
          link:{
            path: 'detail/edit/:id',
            data: ['id']
          }
        },
        {
          type: 'dialog',
          button:{
            variant: 'outlined',
            color: 'primary',
            caption: <DeleteIcon />,
          },
          dialog:{
            title: 'پیغام',
            description: 'آیا مطمئنید که میخواهید حذف کنید؟',
            agree: {
              variant: 'text',
              color: 'primary',
              caption: 'بله',
              callback: (data) => console.log('agree: ', data)
            },
            disagree: {
              variant: 'text',
              color: 'default',
              caption: 'صرف نظر',
              callback: (data) => console.log('disagree: ', data)
            },
            data:['id']
          }
        }
    ]
    },
  ];
  
  const rows = [
    {id: 1, name: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک", category: "دسته ۱", status: true},
  ];

  return (
    <DataGrid
      columns={columns}
      rows={rows}
      hasFilter={true} />
  );
}

export default ProductList;
