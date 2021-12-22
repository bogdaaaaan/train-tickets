import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, TextField } from '@material-ui/core';
import { useState } from 'react';

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
        margin: '10px auto'
    },
}));

const Return = () => {
    const classes = useStyles();

    const [ticket_id, setTicketId] = useState('');

    const hangeTicketId = event => setTicketId(event.target.value);

    return (
        <Box>
            <form className={classes.form}>
                <TextField
                    id='dispatch_date'
                    label='Унікальний індефікатор квитка'
                    type='text'
                    defaultValue=''
                    className={classes.formControl}
                    InputLabelProps={{ shrink: true }}
                    onChange={hangeTicketId}
                />

                <Button variant='contained' color='default'>
                    <Typography> Пошук </Typography>
                </Button>
            </form>
        </Box>
    );
};

export default Return;
