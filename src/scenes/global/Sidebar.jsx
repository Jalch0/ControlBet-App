import { useState, useContext } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AuthContext } from "../../context/authContext";
import Button from '@mui/material/Button';

// Component for item in the sidebar

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

// Prosidebar updated to v1.0.0, can be used v0.7.1

const Sidebar = () => {

  const { currentUser, logout } = useContext(AuthContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
    height="100vh"
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#ade8f4 !important",
        },
        "& .pro-menu-item.active": {
          color: "#4ca5a5 !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* Logo and menu icon */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 5px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  BetStatistiXS
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {/* User */}
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" mb="5px">
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Control Panel
                </Typography>
              </Box>

              <Box display="flex" justifyContent="center" align-items="center">
                <AccountCircleIcon
                  sx={{ fontSize: "90px", color: colors.greenAccent[500] }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "5px 0 0 0" }}
                >
                  {currentUser ? currentUser?.username : "user"}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Admin BetStatistiXS
                </Typography>
              </Box>
            </Box>
          )}

          {/* Menu Items */}
          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
{!isCollapsed ? <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Management
            </Typography> : ""}

            <Item
              title="My bankrolls"
              to="/bankroll"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {currentUser ? (
              <Button sx={{color: colors.greenAccent[500]}} onClick={logout}>Logout</Button>
            ) : (<span>none</span>)}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
