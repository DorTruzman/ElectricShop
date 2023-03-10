import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, signInWithGoogle } from "../services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Button, FormControl, Input, Typography } from "@mui/material";
import GoogleButton from "react-google-button";
import * as isEmail from "is-email";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/home");
  }, [user, loading, navigate]);

  return (
    <>
      <Typography variant="h4">התחברות</Typography>
      <FormControl style={{ marginTop: 10 }}>
        <>
          <Button
            onClick={() => navigate("/register")}
            variant="contained"
            color="secondary"
          >
            הרשמה עם מייל וסיסמה
          </Button>
          <GoogleButton
            label="התחברות באמצעות Google"
            style={{ margin: 20 }}
            onClick={signInWithGoogle}
          />
        </>
        <Input
          style={{ marginTop: 30 }}
          placeholder="מייל"
          id="mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="סיסמה"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          disabled={!email || !password || !isEmail(email)}
          onClick={() => signInWithEmailAndPassword(email, password)}
          style={{ margin: 20 }}
          variant="contained"
          color="success"
        >
          התחברות רגילה
        </Button>
      </FormControl>
    </>
  );
}
export default LoginPage;
