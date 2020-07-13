

import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import React, { useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Link } from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person';
import CloseIcon from '@material-ui/icons/Close';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import { Box } from '@material-ui/core';
import ScheduleIcon from '@material-ui/icons/Schedule';
// npm install --save-dev @iconify/react @iconify/icons-medical-icon
import { Icon, InlineIcon } from '@iconify/react';
import iIntensiveCare from '@iconify/icons-medical-icon/i-intensive-care';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import ListItemLink from './ListItemLink';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import BuildIcon from '@material-ui/icons/Build';
const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "#5A75D6"
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',

  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    backgroundColor: "#2F3136"
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
    backgroundColor: "#2F3136"
  },
  toolbar: {
    display: 'flex',
    alignItems: 'left',
    justifyContent: 'flex-start',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    backgroundColor: "#2F3136"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));
const StyledMenu = withStyles(theme => ({
  paper: {
    backgroundColor: "#2F3136", border: "1px solid gray", marginTop: "1.5%", color: "white"
  }
}
))(Menu);
const useStyles2 = makeStyles(theme => ({
  container: {
    flex: 1,
    width: "100%",

    height: "100%",
    position: 0
  },
  root: {
    flexGrow: 1
  },
  menu: { paper: { backgroundColor: "#2F3136" } },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  account: { marginLeft: "81%" }
}));
const Header = (props) => {
  const classes2 = useStyles2();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const token = localStorage.getItem("token");
    async function fetchData() {


      await fetch("https://bioai-node.herokuapp.com/api/auth/userdata", {
        method: 'GET',
        headers: {
          'x-access-token': token, "Access-Control-Allow-Origin": "*",
        },

      }).then((response) => response.json()).then((data) => {
        console.log(data)
        localStorage.setItem("profile", JSON.stringify(data))

      })
    }

    fetchData();

  }, [])

  // console.log(JSON.parse(localStorage.getItem('profile')).name);

  const [isLogin, setLogin] = React.useState(props.token);
  const classes = useStyles();
  const theme = useTheme();
  const [openDrawer, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }; try {
    if (!JSON.parse(localStorage.getItem('profile')).name) { return <h1>Ooops!. Server Side Error.</h1> }
  } catch (err) { return <h1>Server Side Error</h1> }
  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: openDrawer,
        })}
      >
        <Toolbar>
          {isLogin ? <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: openDrawer,
            })}
          >
            <MenuIcon />
          </IconButton> : ""}
          <Typography variant="title" color="inherit">
            BioAI- Doctor Assistant
          </Typography>
          <div className={classes2.account}>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <br></br>
            {isLogin ?
              <StyledMenu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left"
                }}
                open={open}
                onClose={handleClose}
                className={classes2.menu}

              >
                <MenuItem component={Link} to="./Profile" key={"Profile"} onClick={handleClose}>Profile</MenuItem>
                <MenuItem component={Link} to="/logout" onClick={handleClose}>Logout</MenuItem>
              </StyledMenu>
              :
              <StyledMenu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center"
                }}

                open={open}
                onClose={handleClose}
              >

                <MenuItem style={{ backgroundColor: "#2F3136", color: "white", width: "100%" }} onClick={handleClose}>Log In</MenuItem>
              </StyledMenu>

            }
          </div>
        </Toolbar>
      </AppBar>

      {/* <Dashboard /> */}
      {/* <AddPatient /> */}
      {/* <Appointments /> */}
      {/* <Patient /> */}
      {/* <PDFMake /> */}
      {/* {<PatientsMain />} */}


      {isLogin ?
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: openDrawer,
            [classes.drawerClose]: !openDrawer,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: openDrawer,
              [classes.drawerClose]: !openDrawer,
            }),
          }}
        >
          <div className={classes.toolbar}>

            <Box alignItems="center" style={{ color: "white" }} display="flex">
              <Box>
                <PersonIcon style={{ marginTop: "0.2rem", fontSize: "30px" }} />
              </Box>
              <Box style={{ marginLeft: "1.3rem", fontSize: "19px" }} display="">
                <Typography>Dr. {JSON.parse(localStorage.getItem('profile')).name.toString().substr(0, 12) ? JSON.parse(localStorage.getItem('profile')).name.toString().substr(0, 12) : ""}
                </Typography>
                <Box display="flex" justifyContent="right">
                  <FiberManualRecordIcon style={{ marginLeft: "5%", fontSize: "15px", color: "white" }}></FiberManualRecordIcon>
                  <Typography style={{ fontSize: "11px" }}>Online
              </Typography>
                </Box>
              </Box>
            </Box>

            <IconButton onClick={handleDrawerClose}>
              <CloseIcon style={{ color: "white" }} />
            </IconButton>

          </div>
          <Divider />
          <List>

            <ListItem button component={Link} to="./Dashboard" key={"Dashboard"} onClick={() => { handleDrawerClose() }}>
              <ListItemIcon><EqualizerIcon style={{ color: "white" }} /> </ListItemIcon>
              <ListItemText style={{ color: "white" }} primary={"Dashboard"} />
            </ListItem>
            <ListItem button component={Link} to="./PatientsMain" key={"Patients"} onClick={() => { handleDrawerClose() }}>
              <ListItemIcon><Icon icon={iIntensiveCare} style={{ color: "white", fontSize: "21px" }} /></ListItemIcon>
              <ListItemText style={{ color: "white" }} primary={"Patients"} />
            </ListItem>
            <ListItem button component={Link} to="./Appointments" key={"Appointments"} onClick={() => { handleDrawerClose() }}>
              <ListItemIcon><ScheduleIcon style={{ color: "white" }} /> </ListItemIcon>
              <ListItemText style={{ color: "white" }} primary={"Appointments"} />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button component={Link} to="./BioScan" key={"BioScan"} onClick={() => { handleDrawerClose() }}>
              <ListItemIcon><BuildIcon style={{ color: "white" }} /> </ListItemIcon>
              <ListItemText style={{ color: "white" }} primary={"BioScan"} />
            </ListItem>
            <ListItem button component={Link} to="./Profile" key={"Profile"} onClick={() => { handleDrawerClose() }}>
              <ListItemIcon><PersonIcon style={{ color: "white" }} /></ListItemIcon>
              <ListItemText style={{ color: "white" }} primary={"Profile"} />
            </ListItem>
            <ListItem button component={Link} to="./FAQ" key={"FAQ"} onClick={() => { handleDrawerClose() }}>
              <ListItemIcon><LiveHelpIcon style={{ color: "white" }} /> </ListItemIcon>
              <ListItemText style={{ color: "white" }} primary={"FAQ's"} />
            </ListItem>

            <ListItem button component={Link} to="/logout" key={"Logout"} onClick={() => { handleDrawerClose() }}>
              <ListItemIcon><ExitToAppIcon style={{ color: "white" }} /> </ListItemIcon>
              <ListItemText style={{ color: "white" }} primary={"Logout"} />
            </ListItem>

          </List>
        </Drawer> : ""}
    </div>
  );
};
export default Header;
