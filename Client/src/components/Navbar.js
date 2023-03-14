import { useAuthState } from "react-firebase-hooks/auth";
import { auth, getUserType, logout } from "../services/firebase";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Badge, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import pages from "../pages";
import useName from "../hooks/useName";
import CartIcon from "@mui/icons-material/ShoppingCart";
import { CartContext } from "../contexts/cartContext";
import { useContext, useEffect, useState } from "react";
import { userTypeNames } from "../userTypeNames";

function Navbar() {
  const [user] = useAuthState(auth);
  const { name } = useName();
  const navigate = useNavigate();
  const cartState = useContext(CartContext);
  const { amountOfItems } = cartState.state;
  const [currentUserType, setCurrentUserType] = useState();

  useEffect(() => {
    const getType = async () => {
      let type = await getUserType();
      setCurrentUserType(type);
    };

    getType();
  }, [user]);

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
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
                <Typography
                  fontWeight={"bold"}
                  style={{ marginRight: 30, marginLeft: 30 }}
                >
                  שלום, {name}!
                </Typography>
                {pages.map((page) => {
                  if (
                    (page.showForAdmin &&
                      currentUserType === userTypeNames.ADMIN) ||
                    (page.showForCustomer &&
                      currentUserType !== userTypeNames.ADMIN)
                  ) {
                    return (
                      <MenuItem
                        key={page.url}
                        disabled={page.url === "/cart" && !amountOfItems}
                        onClick={() => navigate(page.url)}
                      >
                        {page.url === "/cart" ? (
                          <>
                            <Badge
                              color="secondary"
                              badgeContent={amountOfItems}
                            >
                              <CartIcon />
                            </Badge>
                          </>
                        ) : (
                          <Typography textAlign="center">
                            {page.name}
                          </Typography>
                        )}
                      </MenuItem>
                    );
                  } else return <></>;
                })}
                <Button
                  color="warning"
                  variant="contained"
                  onClick={() => logout()}
                >
                  התנתקות
                </Button>
              </>
            ) : (
              <Button
                color="secondary"
                variant="contained"
                onClick={() => navigate("/login")}
              >
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
