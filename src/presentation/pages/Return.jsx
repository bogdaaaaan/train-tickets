import { Box } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: 'center'
      },
}));

const Return = () => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <p>To return ticket press "Return tickets" button</p>
        </Box>
    );
};

export default Return;