import { Box, TextField, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { useLocation } from 'react-router';
import Facade from '../modules/Facade';
import { validate_user } from '../modules/utils/validate';

const useStyles = makeStyles(theme => ({
    ticket_data: {
        textAlign: 'center',
        padding: '10px 0',
    },
    btn: {
        background: '#fff',
        color: '#000',
        border: '1px solid black',
        textDecoration: 'none',
        padding: '10px 25px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        maxWidth: '400px',
        margin: '0 auto',
        '& > *': {
            margin: theme.spacing(1),
        },
    }
}));

const Order = () => {
    const classes = useStyles();
    const location = useLocation()
    const {ticket} = location.state;
    const ticketsService = new Facade();

    const [timeouts, setTimeouts] = useState([]);
    setTimeouts([...timeouts, setTimeout(() => {
        alert('Час на покупку білету - 5хв. Необхідно повторити оформлення білету!');
        window.location.href='/';
    }, 300000)]);

    const [first_name, setFirstName] = useState('');
    const [second_name, setSecondName] = useState('');
    const [middle_name, setMiddleName] = useState('');
    const [passport_num, setPassportNum] = useState('');

    const changeFirstName = event => setFirstName(event.target.value);
    const changeSecondName = event => setSecondName(event.target.value);
    const changeMiddleName = event => setMiddleName(event.target.value);
    const changePassportNum = event => setPassportNum(event.target.value);

    const addUserToDatabase = async () => {
        if (!validate_user(first_name, second_name, middle_name, passport_num)) return;
        const user = {user_id: passport_num, first_name, second_name, middle_name, passport_num};
        await ticketsService.addUser(user);
    }

    return (
        <div>
            <Box className={classes.ticket_data}>
                <Typography style={{fontWeight: 'bold', fontSize: '22px'}}>Білет:</Typography>
                <Typography style={{fontWeight: 'bold'}}>Маршрут {ticket.source} - {ticket.destination}</Typography>
                <Typography>Номер вагону: {ticket.railcar_num}</Typography>
                <Typography>Тип вагону: {ticket.railcar_type}</Typography>
                <Typography>Номер місця: {ticket.seat}</Typography>
                <Typography style={{fontWeight: 'bold'}}>Ціна: {ticket.price}</Typography>
            </Box>

            <Box className={classes.form}>
                <Typography style={{fontWeight: 'bold', fontSize: '22px'}}>Введіть ваші дані:</Typography>
                <TextField id="first_name" label="Ім'я" variant="outlined" value={first_name} onChange={changeFirstName}/>
                <TextField id="second_name" label="Прізвище" variant="outlined" value={second_name} onChange={changeSecondName}/>
                <TextField id="middle_name" label="По-батькові" variant="outlined" value={middle_name} onChange={changeMiddleName}/>
                <TextField id="passport" label="Номер паспорту" variant="outlined" value={passport_num} onChange={changePassportNum}/>
                
                <Button variant='contained' color='primary' onClick={async () => {
                    await ticketsService.buyTicket(ticket);
                    await addUserToDatabase();
                    alert('Квиток придбано!');
                    window.location.href='/';
                }}> Оформити квиток </Button>
            </Box>
        </div>
    )
}

export default Order;