import React, { useState } from "react";
import {
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../services/firebase";
import { Button, FormControl, Input, Typography } from "@mui/material";
import GoogleButton from "react-google-button";
import * as isEmail from "is-email";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <Typography variant="h4">הרשמה</Typography>
      <FormControl>
        <>
          <GoogleButton
            label="התחברות באמצעות Google"
            style={{ margin: 20 }}
            onClick={() => {
              try {
                signInWithGoogle();
              } catch (err) {}
            }}
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
          onClick={() => registerWithEmailAndPassword(email, password)}
          style={{ margin: 20 }}
          variant="contained"
          color="success"
        >
          הרשמה
        </Button>
      </FormControl>
    </>
  );
}
export default RegisterPage;
