import { Box, Card, CardActions, CardContent, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { Link } from 'react-router-dom';
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
        border: '1px solid black',
        textDecoration: 'none',
        padding: '10px 25px'
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
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');

    const changeRailcarType = event => setRailcarType(event.target.value);
    const changeDispatchDate = event => setDispatchDate(event.target.value);
    const changeArrivalDate = event => setArrivalDate(event.target.value);
    const changeSource = event => setSource(event.target.value);
    const changeDestination = event => setDestination(event.target.value);

    const createTicket = async () => {
        if (!validate(dispatch_date, arrival_date, source, destination)) return;

        let f = { dispatch_date, arrival_date, source, destination, railcar_type };

        setFetching(true);

        // get tickets from server
        const res = await ticketsService.requestAvailableTickets(f);
        
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

                <label htmlFor='source'>Місце відправки</label>
                <select className={classes.formControl} name='source' id='source' value={source} onChange={changeSource}>
                    <option value=''>None</option>
                    <option value={'Херсон'}>Херсон</option>
                    <option value={'Київ'}>Київ</option>
                    <option value={'Львів'}>Львів</option>
                </select>

                <label htmlFor='destination'>Місце прибуття</label>
                <select className={classes.formControl} name='destination' id='destination' value={destination} onChange={changeDestination}>
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

            <div>{fetching ? 'Fetching data...' : 
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
                                        <Typography style={{fontWeight: 'bold'}}> Ціна: {el.price} </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Link className={classes.btn} to='/order' state={{ticket: el}} onClick={async () => {
                                            await ticketsService.reserveTicket(el);
                                        }}>Замовити</Link>
                                    </CardActions>
                                </Card>
                            );
                        })
                        : ''}
                </div>
            }</div>
            
        </Box>
    );
};

export default Buy;
