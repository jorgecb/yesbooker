import React from 'react';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Hidden from '@material-ui/core/Hidden';
import Poppers from '@material-ui/core/Popper';
import Person from '@material-ui/icons/Person';
import Button from '../CustomButtons/Button';
import {logout} from '../../actions/loginAct';


import headerLinksStyle from '../../assets/jss/material-dashboard-react/components/headerLinksStyle';

interface Props {
    classes: any;
}
let user = JSON.parse(localStorage.getItem('UserCredenciales') || '{}');





class HeaderLinks extends React.Component<Props, {}> {

    anchorEl: any;

    state = {
        open: false,
        username:'',
    };

    handleToggle = () => {
        this.setState({ open: !this.state.open, username: user.data[0].email });
    }

    handleClose = (event: any) => {
        if (this.anchorEl.contains(event.target)) {
            return;
        }

        this.setState({ open: false });
    }

    render() {
        const { classes } = this.props;
        const { open } = this.state;
        const{username}=this.state;
        return (

            <div className={classes.manager}>
                <Button
                    buttonRef={(node: any) => {
                        this.anchorEl = node;
                    }}
                    color={window.innerWidth > 959 ? 'transparent' : 'white'}
                    justIcon={window.innerWidth > 959}
                    simple={!(window.innerWidth > 959)}
                    aria-owns={open ? 'menu-list-grow' : null}
                    aria-haspopup="true"
                    onClick={this.handleToggle}
                    className={classes.buttonLink}
                >
                    <Person className={classes.icons} />
                    <Hidden mdUp={true} implementation="css">
                        <p className={classes.linkText}>

                        </p>
                    </Hidden>
                </Button>
                <Poppers
                    open={open}
                    anchorEl={this.anchorEl}
                    transition={true}
                    disablePortal={true}
                    className={
                        classNames({ [classes.popperClose]: !open }) +
                        ' ' +
                        classes.pooperNav
                    }
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            // id="menu-list-grow"
                            style={{
                                transformOrigin:
                                    placement === 'bottom' ? 'center top' : 'center bottom'
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={this.handleClose}>
                                    <MenuList role="menu">
                                        <MenuItem

                                            className={classes.dropdownItem}

                                        >
                                             {username}
                                       </MenuItem>
                                        <MenuItem
                                            onClick={logout}
                                            className={classes.dropdownItem}

                                        >
                                            Cerrar Sesion
                      </MenuItem>

                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Poppers>
            </div>

        );
    }
}

export default withStyles(headerLinksStyle)(HeaderLinks);