import { Box, Card, CardActions, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';
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
    card: {
        maxWidth: '400px',
        border: '1px solid black',
        margin: '10px'
    },
    card_holder: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        background: '#fff',
        color: '#000',
        border: '1px solid black'
    }
}));

const Buy = () => {
    const ticketsService = new Facade();

    const classes = useStyles();
    const [list, setList] = useState();
    const [fetching, setFetching] = useState(false);

    const [railcar_type, setRailcarType] = useState('');
    const [dispatch_date, setDispatchDate] = useState('');
    const [arrival_date, setArrivalDate] = useState('');
    const [dispatch_place, setDispatchPlace] = useState('');
    const [arrival_place, setArrivalPlace] = useState('');

    const changeRailcarType = event => setRailcarType(event.target.value);
    const changeDispatchDate = event => setDispatchDate(event.target.value);
    const changeArrivalDate = event => setArrivalDate(event.target.value);
    const changeDispatchPlace = event => setDispatchPlace(event.target.value);
    const changeArrivalPlace = event => setArrivalPlace(event.target.value);

    const createTicket = async () => {
        if (!validate(dispatch_date, arrival_date, dispatch_place, arrival_place)) return;

        let t = { id: Math.floor(Math.random() * 10000), dispatch_date, arrival_date, dispatch_place, arrival_place, railcar_type };

        setFetching(true);

        const res = await ticketsService.requestAvailableTickets(t);
        if (res) {
            setFetching(false);
            setList(res);
        }
    };

    return (
        <Box className={classes.root}>
            <form className={classes.form}>
                <label htmlFor='dispatch_date'>Дата відправки</label>
                <input
                    className={classes.formControl}
                    name='dispatch_date'
                    id='dispatch_date'
                    type='date'
                    value={dispatch_date}
                    onChange={changeDispatchDate}
                />

                <label htmlFor='arrival_date'>Дата прибуття</label>
                <input className={classes.formControl} name='arrival_date' id='arrival_date' type='date' value={arrival_date} onChange={changeArrivalDate} />

                <label htmlFor='dispatch_place'>Місце відправки</label>
                <select className={classes.formControl} name='dispatch_place' id='dispatch_place' value={dispatch_place} onChange={changeDispatchPlace}>
                    <option value=''>None</option>
                    <option value={'Херсон'}>Херсон</option>
                    <option value={'Київ'}>Київ</option>
                    <option value={'Львів'}>Львів</option>
                </select>

                <label htmlFor='arrival_place'>Місце прибуття</label>
                <select className={classes.formControl} name='arrival_place' id='arrival_place' value={arrival_place} onChange={changeArrivalPlace}>
                    <option value=''>None</option>
                    <option value={'Херсон'}>Херсон</option>
                    <option value={'Київ'}>Київ</option>
                    <option value={'Львів'}>Львів</option>
                </select>

                <label htmlFor='railcar_type'>Тип вагону</label>
                <select className={classes.formControl} name='railcar_type' id='railcar_type' value={railcar_type} onChange={changeRailcarType}>
                    <option value=''>None</option>
                    <option value={'Плацкарт'}>Плацкарт</option>
                    <option value={'Купе'}>Купе</option>
                    <option value={'Люкс'}>Люкс</option>
                </select>

                <Button variant='contained' color='default' onClick={createTicket}>
                    <Typography> Пошук </Typography>
                </Button>
            </form>

            <p>{fetching ? 'Fetching data...' : ''}</p>
            <div className={classes.card_holder}>
                {list
                    ? list.map((el, inx) => {
                          return (
                              <Card key={inx} className={classes.card}>
                                  <CardContent>
                                    <Typography style={{fontWeight: 'bold'}}> Потяг "{el.source} - {el.destination}" </Typography>
                                    <Typography> Дата відправки: {el.dispatch_date} </Typography>
                                    <Typography> Дата прибуття: {el.arrival_date} </Typography>
                                    <Typography> Тип вагону: {el.railcar_type} </Typography>
                                    <Typography> Номер вагону: {el.railcar_num} </Typography>
                                    <Typography> Номер місця: {el.seat} </Typography>
                                  </CardContent>
                                  <CardActions>
                                      <Button className={classes.btn} variant="outlined"> Замовити</Button>
                                  </CardActions>
                              </Card>
                          );
                      })
                    : ''}
            </div>
        </Box>
    );
};

export default Buy;
