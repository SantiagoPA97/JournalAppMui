import { Link as RouterLink } from "react-router-dom";
import { Google } from "@mui/icons-material"
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth";
import { useMemo } from "react";

const formData = { email: '', password: '' };

export const LoginPage = () => {

  const dispatch = useDispatch();
  const { formState, email, password, onInputChange } = useForm(formData);
  const { status, errorMessage } = useSelector(state => state.auth);

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(startLoginWithEmailPassword(formState));
  }

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
  }

  return (

    <AuthLayout title="Login">

      <form onSubmit={onSubmit}  className="animate__animated animate__fadeIn animate__faster">

        <Grid container>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField value={email} label="Email" type="email" name="email" placeholder="email@domain.com" fullWidth onChange={onInputChange} />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField value={password} label="Password" type="password" name="password" placeholder="Password" fullWidth onChange={onInputChange} />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12}>
              {errorMessage && <Alert severity="error">{ errorMessage }</Alert>}
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Button disabled={isAuthenticating} type="submit" variant="contained" fullWidth>Login</Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button disabled={isAuthenticating} onClick={ onGoogleSignIn } variant="contained" fullWidth>
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">Register</Link>
          </Grid>

        </Grid>

      </form>
    </AuthLayout>
  )
}
