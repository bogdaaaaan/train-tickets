import { Box, FormControl, InputLabel, Select, MenuItem, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    form: {
        margin: '0 auto',
        padding: '25px 15px',
        width: 400,
        display: 'flex',
        flexDirection: 'column',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

const Buy = () => {
    const classes = useStyles();
    const [railcar_type, setRailcarType] = useState('');
    const [dispatch_date, setDispatchDate] = useState(new Date());
    const [arrival_date, setArrivalDate] = useState(new Date());
    const [dispatch_place, setDispatchPlace] = useState('');
    const [arrival_place, setArrivalPlace] = useState('');

    const changeRailcarType = event => setRailcarType(event.target.value);
    const changeDispatchDate = event => setDispatchDate(event.target.value);
    const changeArrivalDate = event => setArrivalDate(event.target.value);
    const changeDispatchPlace = event => setDispatchPlace(event.target.value);
    const changeArrivalPlace = event => setArrivalPlace(event.target.value);

    return (
        <Box className={classes.root}>
            <form className={classes.form}>
                <TextField
                    id='dispatch_date'
                    label='Дата відправки'
                    type='date'
                    defaultValue=''
                    className={classes.textField}
                    InputLabelProps={{ shrink: true }}
                    onChange={changeDispatchDate}
                />
                <TextField
                    id='arrival_date'
                    label='Дата прибуття'
                    type='date'
                    defaultValue=''
                    className={classes.textField}
                    InputLabelProps={{ shrink: true }}
                    onChange={changeArrivalDate}
                />

                <FormControl className={classes.formControl}>
                    <InputLabel id='select-dispatch_place'>Місце відправки</InputLabel>
                    <Select labelId='select-dispatch_place' id='dispatch_place' value={dispatch_place} onChange={changeDispatchPlace} className={classes.selectEmpty}>
                        <MenuItem value=''>None</MenuItem>
                        <MenuItem value={'Херсон'}>Херсон</MenuItem>
                        <MenuItem value={'Київ'}>Київ</MenuItem>
                        <MenuItem value={'Львів'}>Львів</MenuItem>
                    </Select>
                </FormControl>


                <FormControl className={classes.formControl}>
                    <InputLabel id='select-arrival_place'>Місце прибуття</InputLabel>
                    <Select labelId='select-arrival_place' id='arrival_place' value={arrival_place} onChange={changeArrivalPlace} className={classes.selectEmpty}>
                        <MenuItem value=''>None</MenuItem>
                        <MenuItem value={'Херсон'}>Херсон</MenuItem>
                        <MenuItem value={'Київ'}>Київ</MenuItem>
                        <MenuItem value={'Львів'}>Львів</MenuItem>
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel id='select-railcar_type'>Тип вагону</InputLabel>
                    <Select labelId='select-railcar_type' id='railcar_type' value={railcar_type} onChange={changeRailcarType} className={classes.selectEmpty}>
                        <MenuItem value=''>None</MenuItem>
                        <MenuItem value={'плацкарт'}>Плацкарт</MenuItem>
                        <MenuItem value={'купе'}>Купе</MenuItem>
                        <MenuItem value={'люкс'}>Люкс</MenuItem>
                    </Select>
                </FormControl>

                <Button variant="contained" color="default">
                    <Typography> Пошук </Typography>
                </Button>
            </form>
        </Box>
    );
};

export default Buy;
