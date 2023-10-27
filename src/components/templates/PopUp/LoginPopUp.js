import React, { useContext, useState } from "react";
import styled from "styled-components";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";

// icons
import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import StateContext from "@/context/StateContext";
import { useDispatch } from "react-redux";
import { loginUser } from "@/Redux/Slices/authSlice";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
const Container = styled.div`
  padding: 6rem 2rem;

  @media (max-width: 600px) {
    padding: 2rem 0;
  }
`;

const HeaderBox = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Header = styled.p`
  font-size: 1.8rem;
  font-family: "WhyInkHeavy";
  line-height: 1.2;

  @media (max-width: 600px) {
    font-size: 1.5rem;
  }

  @media (min-width: 601px) and (max-width: 1024px) {
    font-size: 2.2rem;
  }
`;

const Box = styled.div`
  padding: 0.5rem;
`;

const Label = styled.p`
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.5rem;

  @media (max-width: 600px) {
    font-size: 0.75rem;
  }

  @media (min-width: 601px) and (max-width: 1024px) {
    font-size: 0.7rem;
  }
`;

const ButtonBox = styled.div`
  padding: 0.5rem;
  margin-top: 2rem;
`;

const Button = styled.div`
  background-color: var(--purpleColor);
  color: #fff;
  font-size: 1.2rem;
  padding: 0.9rem 0;
  text-align: center;
  border-radius: 0.3rem;
  transition: all 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: var(--buttonHover);
  }
  @media (max-width: 600px) {
    width: 80%;
    margin: auto;
    padding: 1rem 0;
  }

  @media (max-width: 600px) {
    font-size: 1rem;
  }
  @media (min-width: 601px) and (max-width: 1024px) {
    font-size: 0.8rem;
    padding: 0.9rem 3rem;
  }
`;

const ActionBox = styled.div`
  margin-top: 1rem;
  text-align: center;
`;

const ActionText = styled.p`
  color: #000;
  font-size: 0.95rem;
  font-weight: 600;
  font-family: "Montserrat";
  opacity: 0.9;
  line-height: 1.6;

  @media (max-width: 600px) {
    font-size: 0.75rem;
  }

  @media (min-width: 601px) and (max-width: 1024px) {
    font-size: 0.9rem;
  }
`;

const ActionLink = styled.a`
  color: var(--purpleColor);
  font-size: 0.95rem;
  font-family: "Montserrat";
  font-weight: 700;
  opacity: 0.9;
  line-height: 1.6;
  cursor: pointer;
  @media (max-width: 600px) {
    font-size: 0.85rem;
  }

  @media (min-width: 601px) and (max-width: 1024px) {
    font-size: 0.9rem;
  }
`;

const LoginSchema = z.object({
  emailOrPhone: z.string().nonempty({ message: "Email or Phone is required" }),
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 characters long" }),
});
export default function LoginPopUp({ openLoginPopUp, setOpenLoginPopUp }) {
  const { setOpenSignInPopUp } = useContext(StateContext);
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickOpen = () => {
    setOpenLoginPopUp(true);
  };

  const handleClose = () => {
    setOpenLoginPopUp(false);
  };
  const handleSignUp = () => {
    setOpenSignInPopUp(true);
    setOpenLoginPopUp(false);
  };
  function onSuccess() {
    setOpenLoginPopUp(false);
  }
  const handleLogin = handleSubmit((data) => {
    const { emailOrPhone: email, password } = data;
    dispatch(loginUser({ credentials: { email, password }, onSuccess }));
  });

  return (
    <Dialog
      open={openLoginPopUp}
      onClose={handleClose}
      fullWidth={true}
      maxWidth="sm"
      disableScrollLock={true}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Container>
          <HeaderBox>
            <Header>Login in to BOLETASO</Header>
          </HeaderBox>

          <Box>
            <Label>Email Address or Phone Number</Label>
            <TextField
              type="email"
              fullWidth={true}
              placeholder="Email"
              {...register("emailOrPhone")}
              error={Boolean(errors.emailOrPhone)}
              helperText={errors.emailOrPhone?.message}
            />
          </Box>

          <Box>
            <Label>Password</Label>
            <FormControl sx={{}} variant="outlined" fullWidth={true}>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password")}
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>

          <ButtonBox>
            <Button onClick={handleLogin}>Log in</Button>
          </ButtonBox>

          <ActionBox>
            <ActionText>
              Need a BOLETASO account?{" "}
              <ActionLink onClick={handleSignUp}>Sign up here</ActionLink>
            </ActionText>
          </ActionBox>
        </Container>
      </DialogContent>
    </Dialog>
  );
}
