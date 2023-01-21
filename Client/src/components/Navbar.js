import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebase";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { InputBase, MenuItem } from "@mui/material";
import { alpha, styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import pages from "../pages";

function Navbar() {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));
  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              חשמל באוויר
            </Typography>

            {!user ? (
              <>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase placeholder="חיפוש מוצרים..." />
                </Search>
                {pages.map((page) => (
                  <MenuItem key={page.url} onClick={() => navigate(page.url)}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ))}
                <Button color="inherit">התנתקות</Button>
              </>
            ) : (
              <Button color="inherit">התחברות</Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default Navbar;
