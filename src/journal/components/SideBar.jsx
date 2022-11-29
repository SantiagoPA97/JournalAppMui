import { TurnedInNot } from "@mui/icons-material";
import { Box, Divider, Drawer, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from "@mui/material";

export const SideBar = ({ drawerWidth = 240 }) => {
  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="permanent" //temporary
        open={ true }
        sx= {{ display: { xs: "block" },
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth } 
        
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">Santiago Pelaez</Typography>
        </Toolbar>
        <Divider />

        <List>
          {
            ['Enero', 'Febrero', 'Marzo', 'Abril'].map(month => (
              <ListItem key={ month } disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <TurnedInNot />
                  </ListItemIcon>

                  <Grid container>
                    <ListItemText primary={ month }/>
                    <ListItemText secondary={ 'Veniam fugiat ad ipsum dolor ipsum velit anim eu non nisi ad veniam Lorem.' }/>
                  </Grid>

                </ListItemButton>
              </ListItem>
            ))
          }
        </List>

      </Drawer>
    </Box>
  )
}
