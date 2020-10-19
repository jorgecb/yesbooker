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
import action from '../../redux/actions/actions';


import headerLinksStyle from '../../assets/jss/material-dashboard-react/components/headerLinksStyle';

interface Props {
    classes: any;
}

class HeaderLinks extends React.Component<Props, {}> {

    anchorEl: any;

    state = {
        open: false
    };

    handleToggle = () => {
        this.setState({ open: !this.state.open });
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
                    <span className={classes.notifications}>5</span>
                    <Hidden mdUp={true} implementation="css">
                        <p className={classes.linkText}>
                            {/* onClick={this.handleClick} */}
                Notification
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
                                            onClick={action.logout}
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
