import React, { useContext, useEffect, useState } from 'react';
import { __RouterContext as RouterContext } from 'react-router';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { useWindowSize } from '../../shared/window-size';
import { Store } from '../../store';
import { Grid } from '@material-ui/core';
import TextFilter from './filtering/text-filter';
import SelectFilter from './filtering/select-filter';
import ColumnLabel from './column-label';
import Button from '@material-ui/core/Button';
import PromptDialog from './prompt-dialog';
import { DataGridProps, Filtering, Sorting, Column, ActionColumn } from './model';

export function useRouter() {
  return useContext(RouterContext);
};

const drawerWidth = 240;
const pagePadding = 24;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    container: {
      maxHeight: 440,
    },
    marginRight:{
      marginLeft: theme.spacing(1),
  },
  }),
);

const DataGrid: React.FC<DataGridProps> = ({columns, rows, hasFilter}) => {
  const size = useWindowSize();
  const { history } = useRouter();
  const { state } = useContext(Store.Context);
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filter, setFilter] = useState<Array<Filtering>>([]);
  const [sort, setSort] = useState<Array<Sorting>>([]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columnFilter = (column: Column) => {
    switch (column.filter) {
        case 'text':
            return <TextFilter
                      id={column.id}
                      filtering={filtering} />
        case 'select':
            return <SelectFilter
                      id={column.id}
                      filtering={filtering}
                      options={column.filterOption ? column.filterOption : []} />
        case 'none':
            return <TextFilter id={column.id} filtering={filtering} disabled={true} />
    }
  }

  const filtering = (id: string, value: any) => {
    const _index = filter.findIndex(x=> x.id === id);
    const newFilter = filter;
    if(_index === -1){//new
      newFilter.push({id: id, value: value});
    }
    else{
      if(value){ //modify
        newFilter[_index].value = value;
      }
      else{ //remove
        newFilter.splice(_index, 1);
      }
    }
    setFilter([...newFilter]);
  }
  useEffect(() => {
    console.log('Filter: ', ...filter);
  },[filter]);

  const sorting = (id: string, order: 'asc' | 'desc' | undefined) => {
    const _index = sort.findIndex(x=> x.id === id);
    const newSort = sort;
    if(_index === -1){//new
      newSort.push({id: id, order: order});
    }
    else{
      if(order !== undefined){//modify
        newSort[_index].order = order;
      }
      else{//remove
        newSort.splice(_index, 1);
      }
    }
    setSort([...newSort]);
  }
  useEffect(() => {
    console.log('Sort: ', ...sort);
  },[sort]);

  const columnAction = (action: ActionColumn, row: any) => {
    switch (action.type) {
      case 'link':
        let path = '';
        if(action.link !== undefined){
          path = action.link.path !== undefined ? action.link.path : ''
          if(action.link.data !== undefined) { path = SetPathVariables(path, action.link.data, row) }
        }

        return <Button onClick={() => history.push(path)} variant={action.button.variant} color={action.button.color} disabled={action.button.disabled !== undefined ? action.button.disabled : false}>{action.button.caption}</Button>
      case 'dialog':
        if (action.dialog !== undefined){
          if(action.dialog.data !== undefined){
            const data: any = {};
            action.dialog?.data.forEach((key: string) => {
              data[key] = row[key].toString().trim();
            })
            return <PromptDialog option={action.dialog} button={action.button} data={data} />
          }
          else { return null }
        }
        else { return null }
      case 'throwback-data':
        const data:any = {};
        if(action.throwback !== undefined){
          action.throwback.data.forEach((key: string) => {
            data[key] = row[key];
          })
          return <Button onClick={() => action.throwback?.callback(data)} variant={action.button.variant} color={action.button.color} disabled={action.button.disabled !== undefined ? action.button.disabled : false}>{action.button.caption}</Button>
        }
        else { return null }        
    }
  }

  const SetPathVariables = (url: string, keys: Array<string>, data: any): string => {
    keys.forEach((key: string) => {
      url = url.replace(
        new RegExp(`:${key}(/|$)`, 'g'),
        `${data[key].toString().trim()}$1`
      )
    })
    return url
  }

  return (
    <Paper className={classes.root}>
      <TableContainer
        className={classes.container}
        style={{width: `${size.width - ((pagePadding *2) + (state.general.drawer ? drawerWidth : 0 )) }px`}}>
        <Table aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  key={index}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                    <Grid
                        container
                        direction="column"
                        justify="flex-start"
                        alignItems="stretch"
                    >
                        <Grid item>
                          <ColumnLabel
                            id={column.id}
                            title={column.label}
                            sort={column.sort}
                            sorting={sorting} />
                        </Grid>
                        {hasFilter && <Grid item>{columnFilter(column)}</Grid>}
                    </Grid>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any, rowIndex) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                  {columns.map((column, index) => {
                    if(column.actions === undefined){
                      const value = row[column.id];
                      return (
                        <TableCell key={index} align={column.align}>
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      );
                    }
                    else{
                      return (
                        <TableCell key={index} align={column.align}>
                          <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="center"
                          >
                          {column.actions.map((action, i) => ( <Grid item key={i} className={classes.marginRight}>{columnAction(action, row)}</Grid>))}
                          </Grid>
                        </TableCell>
                      );
                    }
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default DataGrid;
