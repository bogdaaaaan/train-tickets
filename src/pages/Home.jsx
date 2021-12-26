import { Box } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'center'
      },
    flex_image: {
        width: '100%'
    }
}));

const Home = () => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <h1>Ласкаво просимо до Резервування квитків</h1>
            <p>Для того щоб замовити квиток натисність кнопку "Придбати квиток"</p>
            <p>Для того щоб повернути квиток натисність кнопку "Повернути квиток"</p>
            <img className={classes.flex_image} src="https://images.unsplash.com/photo-1535535112387-56ffe8db21ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c3RlYW0lMjB0cmFpbnxlbnwwfHwwfHw%3D&w=1000&q=80" alt="main menu train"/>
        </Box>
    );
};

export default Home;