import { Button, FormControl, TextField, Typography } from '@material-ui/core';
import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { auth } from './firebase';
import styles from "./Login.module.css"

const Login: FC = (props: any) => {//The reason of using any type is that the type of a data from <Route> is highly complex.
   const [isLogin, setIsLogin] = useState(true);
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")

   useEffect(() => {
      const unSub = auth.onAuthStateChanged(user => {
         user && props.history.push("/")
      })
      return () => unSub()
   }, [props.history])

   return (
      <div className={styles.login__root}>
         <h1>{isLogin ? "Login" : "Register"}</h1>
         <br />
         <FormControl>
            <TextField
               InputLabelProps={{ shrink: true }}
               name="email"
               label="E-mail"
               value={email}
               onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            />
         </FormControl>
         <br />
         <FormControl>
            <TextField
               InputLabelProps={{ shrink: true }}
               name="password"
               label="Password"
               value={password}
               type="password"
               autoComplete="current-password"
               onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />
         </FormControl>
         <br />
         <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={
               isLogin ? async () => {
                  try {
                     await auth.signInWithEmailAndPassword(email, password)
                     props.history.push("/")
                  } catch (error) {
                     alert(error.message)
                  }
               } : async () => {
                  try {
                     await auth.createUserWithEmailAndPassword(email, password)
                  } catch (error) {
                     alert(error.message)
                  }
               }
            }
         >
            {isLogin ? "Login" : "Register"}
         </Button>
         <br />
         <Typography align="center">
            <span className={styles.login__span} onClick={() => setIsLogin(!isLogin)}>
               {isLogin ? "Create new account ?" : "Back to login"}
            </span>
         </Typography>
      </div>
   )
}

export default Login