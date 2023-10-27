import React, { useState } from "react";
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
	FormHelperText,
} from "@mui/material";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
// icons
import CloseIcon from "@mui/icons-material/Close";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { signupUser } from "@/Redux/Slices/authSlice";
import { useDispatch } from "react-redux";

const SignupFormSchema = z.object({
    name: z.string().min(1,"Name is required"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().optional(),
    password: z.string().min(8, "Password should be at least 8 characters"),
    confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
});


const Container = styled.div`
	padding: 0 2rem;

	@media (max-width: 600px) {
		padding: 2rem 0;
	}
`;

const HeaderBox = styled.div`
	text-align: center;
	margin-bottom: 2rem;
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

export default function SignInPop({ openSignInPopUp, setOpenSignInPopUp }) {
	const [showPassword, setShowPassword] = React.useState(false);
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors }
	  } = useForm({
		resolver: zodResolver(SignupFormSchema)
	  });
	  const onSuccess = ()=>{
		setOpenSignInPopUp(false);
	  }

	  const handleSignup = handleSubmit((data) => {
		
	dispatch(signupUser({credentials : data , onSuccess }))
		
	  });
	

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	const handleClickOpen = () => {
		setOpenSignInPopUp(true);
	};

	const handleClose = () => {
		setOpenSignInPopUp(false);
	};
	const onSubmit = (data) => {
		console.log(data);
	  };
	return (
		<Dialog open={openSignInPopUp} onClose={handleClose} fullWidth={true} maxWidth='sm' disableScrollLock={true}>
			<DialogTitle sx={{ m: 0, p: 2 }}>
				<IconButton
					aria-label='close'
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
						<Header>Sign up for BOLETASO</Header>
					</HeaderBox>
					<Box>
    <Label>Name</Label>
    <TextField
 	   type="text"
 	   fullWidth={true}
 	   {...register("name")}
 	   error={!!errors.name}
 	   helperText={errors.name?.message}
    />
</Box>
					<Box>
            <Label>Email Address</Label>
            <TextField
              type="email"
              fullWidth={true}
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Box>

		  <Box>
            <Label>Phone Number (Optional)</Label>
            <TextField
              type="tel"
              fullWidth={true}
              {...register("phoneNumber")}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber?.message}
            />
          </Box>

		  <Box>
            <Label>Password</Label>
            <FormControl sx={{}} variant="outlined" fullWidth={true}>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                {...register("password")}
                error={!!errors.password}
			
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
              {errors.password && <FormHelperText error>{errors.password.message}</FormHelperText>}
            </FormControl>
          </Box>

					
          <Box>
            <Label>Confirm Password</Label>
            <FormControl sx={{}} variant="outlined" fullWidth={true}>
              <OutlinedInput
                type={showPassword ? "text" : "password"}
                {...register("confirmPassword")}
                error={!!errors.confirmPassword}
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
              {errors.confirmPassword && <FormHelperText error>{errors.confirmPassword.message}</FormHelperText>}
            </FormControl>
          </Box>

		  <ButtonBox>
            <Button onClick={handleSignup}>Sign up</Button>
          </ButtonBox>
					
				</Container>
			</DialogContent>
		</Dialog>
	);
}
