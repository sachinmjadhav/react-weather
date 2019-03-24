import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import "./Navbar.css";

function Navbar() {
  return (
    <div>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography
            variant="h4"
            color="inherit"
            className="nav_title"
            onClick={() => window.location.reload()}
          >
            Weather Forecast
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
