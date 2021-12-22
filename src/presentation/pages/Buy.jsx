import { Box, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Facade from '../../business/Facade';
import { validate } from '../utils/validate';

const useStyles = makeStyles(theme => ({
    form: {
        margin: '0 auto',
        padding: '25px 15px',
        width: 400,
        display: 'flex',
        flexDirection: 'column',
    },
    formControl: {
        minWidth: 120,
        width: '100%',
        margin: '10px auto',
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

    const createTicket = () => {
        let v = validate(dispatch_date, arrival_date, dispatch_place, arrival_place);
        if (v) {
            alert(v);
            return;
        }
        let t = {
            id: Math.floor(Math.random() * 10000),
            dispatch_date: dispatch_date,
            arrival_date: arrival_date,
            dispatch_place: dispatch_place,
            arrival_place: arrival_place,
            railcar_type: railcar_type,
        };
        console.log(t);
        let facade = new Facade();
        facade.createTicket(t);
    };

    return (
        <Box className={classes.root}>
            <form className={classes.form}>
                <TextField
                    id='dispatch_date'
                    label='Дата відправки'
                    type='date'
                    defaultValue=''
                    className={classes.formControl}
                    InputLabelProps={{ shrink: true }}
                    onChange={changeDispatchDate}
                />
                <TextField
                    id='arrival_date'
                    label='Дата прибуття'
                    type='date'
                    defaultValue=''
                    className={classes.formControl}
                    InputLabelProps={{ shrink: true }}
                    onChange={changeArrivalDate}
                />

                <label htmlFor='dispatch_place'>Місце відправки</label>
                <select name='dispatch_place' id='dispatch_place' value={dispatch_place} onChange={changeDispatchPlace}>
                    <option value=''>None</option>
                    <option value={'Херсон'}>Херсон</option>
                    <option value={'Київ'}>Київ</option>
                    <option value={'Львів'}>Львів</option>
                </select>

                <label htmlFor='arrival_place'>Місце прибуття</label>
                <select name='arrival_place' id='arrival_place' value={arrival_place} onChange={changeArrivalPlace}>
                    <option value=''>None</option>
                    <option value={'Херсон'}>Херсон</option>
                    <option value={'Київ'}>Київ</option>
                    <option value={'Львів'}>Львів</option>
                </select>

                <label htmlFor='railcar_type'>Тип вагону</label>
                <select name='railcar_type' id='railcar_type' value={railcar_type} onChange={changeRailcarType}>
                    <option value=''>None</option>
                    <option value={'Плацкарт'}>Плацкарт</option>
                    <option value={'Купе'}>Купе</option>
                    <option value={'Люкс'}>Люкс</option>
                </select>

                
                <Button variant='contained' color='default' onClick={createTicket}>
                    <Typography> Пошук </Typography>
                </Button>
            </form>
        </Box>
    );
};

export default Buy;
