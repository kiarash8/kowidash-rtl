import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Container } from '../../layouts';
import { Link as RouterLink, RouteComponentProps } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { IField } from '../../shared/interface';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        action: {
            marginTop: theme.spacing(2)
        },
        formControlContainer: {
            paddingRight: theme.spacing(1),
            paddingLeft: theme.spacing(1)
        },
        formControl: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(2),
        },
        switchLabel: {
            marginLeft: '0px!important'
        }
    }),
);

type TParams = { id?: string, mood?: 'view' | 'edit' };

const Product: React.FC<RouteComponentProps<TParams>> = ({ match }) => {
    const classes = useStyles();
    const params = match.params;
    const id = params.id !== undefined ? params.id : null;
    const mood = id ? params.mood : null;

    const [fields, setFields] = useState<IField>({
        name: {
            type: 'text',
            value: '',
            validation: false,
            required: true
        },
        category: {
            type: 'text',
            value: '',
            validation: false,
            required: true
        },
        description: {
            type: 'text',
            value: '',
            validation: false,
            required: true
        },
        status: {
            type: 'checked',
            value: false,
            validation: false,
            required: true
        },
    });
    const handleChange = (event: React.ChangeEvent<any>, field: string) => {
        const value = fields[field].type === 'text' ? event.target.value : event.target.checked;
        setFields({
            ...fields,
            [field]: {
                ...fields[field],
                value: value,
                validation: false,
            }
        });
    };

    const getData = () => {
        setFields({
            name: {
                ...fields.name,
                value: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک',
            },
            category: {
                ...fields.category,
                value: 1,
            },
            description: {
                ...fields.description,
                value: '...',
            },
            status: {
                ...fields.status,
                value: false,
            }
        });
    }

    React.useEffect(() => {
        if (id) {
            getData()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id]);

    const save = () => { id ? edit() : add(); }
    const add = () => { console.log('add') }
    const edit = () => { console.log('edit') }

    return (
        <Container>
            <Grid container>
                <Grid item xs={12} sm={6} className={classes.formControlContainer}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        autoComplete="off"
                        size="small"
                        className={classes.formControl}
                        label="نام"
                        value={fields.name.value}
                        error={fields.name.validation}
                        onChange={e => handleChange(e, 'name')}
                        disabled={mood === 'view'}
                    />
                </Grid>
                <Grid item xs={12} sm={6} className={classes.formControlContainer}>
                    <FormControl variant="outlined" size="small" fullWidth className={classes.formControl} disabled={mood === 'view'}>
                        <InputLabel>دسته بندی پدر</InputLabel>
                        <Select
                            label="دسته بندی پدر"
                            value={fields.category.value}
                            error={fields.category.validation}
                            onChange={e => handleChange(e, 'category')}
                        >
                            <MenuItem value="">
                                <small><em>هیچکدام</em></small>
                            </MenuItem>
                            <MenuItem value={1}>دسته ۱</MenuItem>
                            <MenuItem value={2}>دسته ۲</MenuItem>
                            <MenuItem value={3}>دسته ۳</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} className={classes.formControlContainer}>
                    <TextField
                        multiline
                        rows={4}
                        fullWidth
                        variant="outlined"
                        autoComplete="off"
                        size="small"
                        className={classes.formControl}
                        label="توضیحات"
                        value={fields.description.value}
                        error={fields.description.validation}
                        onChange={e => handleChange(e, 'description')}
                        disabled={mood === 'view'}
                    />
                </Grid>
                <Grid item xs={12} className={classes.formControlContainer}>
                    <FormControlLabel
                        className={classes.switchLabel}
                        value="start"
                        control={
                            <Switch
                                color="primary"
                                value={fields.status.value}
                                onChange={e => handleChange(e, 'status')} />
                        }
                        label="انتشار"
                        labelPlacement="start"
                        disabled={mood === 'view'}
                    />
                </Grid>
            </Grid>


            <Grid container
                className={classes.action}
                spacing={2}
                direction="row"
                justify="flex-end"
                alignItems="flex-start">
                <Grid item>
                    <Button component={RouterLink} to={'/main/products/list'}>
                        {mood === 'view' ?
                            'بازگشت' :
                            'انصراف'}
                    </Button>
                </Grid>
                <Grid item>
                    {mood !== 'view' ?
                        <Button
                            onClick={() => save()}
                            variant="contained"
                            color="primary"
                        >
                            {id ? 'ویرایش' : 'ذخیره'}
                        </Button>
                        :
                        <Button
                            color="primary"
                            variant="contained"
                            component={RouterLink}
                            to={`/main/products/detail/edit/${id}`}>ویرایش</Button>
                    }
                </Grid>
            </Grid>
        </Container>
    );
}

export default Product;
