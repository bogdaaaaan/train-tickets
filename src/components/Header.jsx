import '@fontsource/roboto';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
          margin: theme.spacing(1),
        },
      },
}));

const Header = () => {
    const classes = useStyles();

    return (
        <AppBar position='static'>
            <Toolbar className={classes.root}>
                <Button variant="contained" color="default" href='/'>
                    <Typography> Головна </Typography>
                </Button>
                <Button variant="contained" color="default" href='/buy'>
                    <Typography> Придбати квиток </Typography>
                </Button>
                <Button variant="contained" color="default" href='/return'>
                    <Typography> Повернути квиток </Typography>
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;