import React, { useRef } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import _ from "lodash";
import { TextFilterProps } from '../model';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      marginTop: theme.spacing(1),
    }
  }),
);

const TextFilter: React.FC<TextFilterProps> = ({id, filtering, disabled}) => {
  const classes = useStyles();
  const [searchKey, setSearchKey] = React.useState('');
  const delayedQuery = useRef(_.debounce(q => filtering(id, q), 500)).current;

  const handleChange = (event: any) => {
    if(!disabled){
      setSearchKey(event.target.value);
      delayedQuery(event.target.value);
    }
  };

  return (
    <TextField
        disabled={disabled !== undefined ? disabled : false}
        value={searchKey}
        onChange={e => handleChange(e)}
        className={classes.textField}
        fullWidth
        type="search" />
  );
}

export default TextFilter;