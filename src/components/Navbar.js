import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

function Navbar() {
  return (
    <div>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h4" color="inherit" style={{ margin: "0 auto" }}>
            Weather Forecast
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
