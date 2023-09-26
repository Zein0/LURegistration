"use client";
import "./login.css";
import Image from "next/image";
import React, { createRef, useContext, useState } from "react";
import { Button, TextField } from "@mui/material";
import { UserDataContext } from "../../../contexts/UserDataContext";

const page = () => {
	const emailRef = createRef(null);
	const passwordRef = createRef(null);
	const [errorMsg, setErrorMsg] = useState("");

	const {
		state: { loginLoading },
		actions: { login },
	} = useContext(UserDataContext);

	return (
		<div className="login-container">
			<div className="login-image-container">
				<Image
					className="login-image"
					src="/uni.webp"
					width={1500}
					height={1500}
				/>
			</div>
			<div className="login-form-container">
				<div className="login-form">
					<TextField
						inputRef={emailRef}
						required
						id="standard-required"
						label="Email"
						variant="standard"
					/>
					<TextField
						inputRef={passwordRef}
						required
						id="standard-required"
						label="Password"
						type="password"
						variant="standard"
					/>
				</div>
				<p>{errorMsg}</p>
				<Button
					variant="contained"
					className="login-button"
					disabled={loginLoading}
					onClick={async () => {
						let signIn = await login({
							email: emailRef.current.value,
							password: passwordRef.current.value,
						});
						console.log("signIn", signIn);
						setErrorMsg(signIn);
					}}
				>
					Log In
				</Button>
			</div>
		</div>
	);
};

export default page;
