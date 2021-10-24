import { AppBar, Badge, BadgeProps, IconButton, Menu, MenuItem, styled, Toolbar, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { EventNote, ExitToApp, Home } from "@mui/icons-material";
import { persistor } from "../../interfaces/store";


const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 5,
    top: 5,
    padding: "2px 4px",
    fontSize: "1px",
    minWidth: "3px",
    minHeight: "6px"
  },
}));

const paperProps = {
  elevation: 0,
  sx: {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    mt: 1,
    '& .MuiAvatar-root': {
      ml: -0.5,
      mr: 1,
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 110,
      width: 10,
      height: 10,
      bgcolor: 'background.paper',
      transform: 'translateY(-30%) rotate(45deg)',
      zIndex: 0,
    },
  },
}
export const MtmToolBar = () => {
  const history = useHistory();
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const onClickAccountMenu = () => {

  }

  const onClickMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(e.currentTarget);
  }
  const onCloseMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(null);
  }

  return (
    <Box>
      <AppBar position="static" >
        <Toolbar sx={{ minHeight: "42px" }}>
          <IconButton
            edge="start"
            color="inherit"
            sx={{ mr: 1 }}
            onClick={onClickMenu}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={onCloseMenu}
            PaperProps={paperProps}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={() => {
              history.push("/calendar")
            }}>
              <EventNote />
              <Typography component="span" sx={{ ml: 1 }}>Calendar</Typography>
            </MenuItem>
            <MenuItem onClick={() => {
              history.push("/home")
            }}>
              <Home />
              <Typography component="span" sx={{ ml: 1 }}>HOME</Typography>
            </MenuItem>
          </Menu>
          <Typography
            noWrap
            sx={{
              cursor: "pointer"
            }}
            onClick={() => {
              history.push("/home")
            }}
          >
            MTM
          </Typography>
          <Box sx={{ flexGrow: 1 }} />

          <Box>
            <IconButton
              onClick={() => {
                persistor.purge();
                window.location.reload();
              }}>
              <ExitToApp />
            </IconButton>
            <IconButton >
              <StyledBadge color="error">
                <NotificationsIcon />
              </StyledBadge>
            </IconButton>
            <IconButton
              onClick={onClickAccountMenu}>
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}