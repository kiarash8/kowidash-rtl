import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { SelectFilterProps } from '../model';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
        marginTop: theme.spacing(1),
    }
  }),
);

const SelectFilter: React.FC<SelectFilterProps> = ({id, options, filtering}) => {
  const classes = useStyles();
  const [filterValue, setFilterValue] = React.useState<string | number>('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    filtering(id, event.target.value);
    setFilterValue(event.target.value as number);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <FormControl className={classes.formControl} fullWidth>
        <Select
          open={open}
          value={filterValue}
          onClose={handleClose}
          onOpen={handleOpen}
          onChange={handleChange}
          fullWidth
        >
            <MenuItem value="">
                <small><em>هیچکدام</em></small>
            </MenuItem>
            {options.map((item, index) => (
              <MenuItem key={index} value={item.key}>{item.value}</MenuItem>
            ))}
        </Select>
    </FormControl>
  );
}

export default SelectFilter;