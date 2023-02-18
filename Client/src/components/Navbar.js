import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "../services/firebase";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputBase, MenuItem } from "@mui/material";
import { alpha, styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import pages from "../pages";
import useName from "../hooks/useName";

function Navbar() {
  const [user] = useAuthState(auth);
  const { name } = useName();
  const navigate = useNavigate();

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {/* <IconButton
              color="inherit"
              component="div"
              aria-label="open drawer"
            >
              <SearchIcon />
            </IconButton> */}
            <Typography
              onClick={() => navigate("/home")}
              style={{ cursor: "pointer" }}
              variant="h6"
              component="div"
              fontWeight={"bold"}
              sx={{ flexGrow: 1 }}
            >
              חשמל באוויר
            </Typography>

            {user ? (
              <>
                <Typography variant="h7">שלום, {name}!</Typography>
                {pages.map((page) => (
                  <MenuItem key={page.url} onClick={() => navigate(page.url)}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ))}
                <Button color="inherit" onClick={() => logout()}>
                  התנתקות
                </Button>
              </>
            ) : (
              <Button color="inherit" onClick={() => navigate("/login")}>
                התחברות
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default Navbar;
