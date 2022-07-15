import React, { useState, useEffect } from "react";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

import memoriesLogo from "../../images/memoriesLogo.png";
import memoriesText from "../../images/memoriesText.png";
import Logo_Hust from "../../images/Logo_Hust.png";
import * as actionType from "../../constants/actionTypes";
import useStyles from "./styles";
import Chat from "../../pages/Chat/Chat";

const Navbar = () => {
	const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
	const dispatch = useDispatch();
	const location = useLocation();
	const history = useHistory();
	const classes = useStyles();

	const logout = () => {
		dispatch({ type: actionType.LOGOUT });

		history.push("/auth");

		setUser(null);
	};

	const profile = () => {
		history.push("/profile");
	};

	const chat = () => {
		history.push("/chat");
	};

	useEffect(() => {
		const token = user?.token;

		if (token) {
			const decodedToken = decode(token);

			if (decodedToken.exp * 1000 < new Date().getTime()) logout();
		}

		setUser(JSON.parse(localStorage.getItem("profile")));
	}, [location]);

	return (
		<AppBar className={classes.appBar} position="static" color="inherit">
			<Link
				to="/"
				style={{ textDecoration: "none" }}
				className={classes.brandContainer}
			>
				<img
					className={classes.image}
					src={Logo_Hust}
					alt="icon"
					height="80px"
				/>
				<span
					component={Link}
					to="/"
					src={memoriesText}
					style={{ paddingLeft: "20px" }}
					alt="icon"
					height="45px"
				>
					{" "}
					HUST CLASS
				</span>
			</Link>
			<Toolbar className={classes.toolbar}>
				{user?.result ? (
					<div className={classes.profile}>
						<Avatar
							className={classes.purple}
							alt={user?.result.name}
							src={user?.result.imageUrl}
						>
							{user?.result.name.charAt(0)}
						</Avatar>
						<Typography
							className={classes.userName}
							style={{ cursor: "pointer" }}
							onClick={profile}
							variant="h6"
						>
							{user?.result.name}
						</Typography>
						<Button
							variant="contained"
							className={classes.logout}
							color="primary"
							onClick={chat}
						>
							Trò chuyện
						</Button>
						<Button
							variant="contained"
							className={classes.logout}
							style={{ backgroundColor: "#aa261b" }}
							color="secondary"
							onClick={logout}
						>
							Đăng xuất
						</Button>
					</div>
				) : (
					<Button
						onClick={logout}
						variant="contained"
						style={{ backgroundColor: "#aa261b" }}
						color="primary"
					>
						Đăng nhập
					</Button>
				)}
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
