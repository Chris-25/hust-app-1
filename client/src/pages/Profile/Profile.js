import React, { useEffect, useState } from "react";
import { Grid, Paper, TextField } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import Input from "../Auth/Input";
import userApi from "../../api/user";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { AUTH } from "../../constants/actionTypes";
import { useDispatch } from "react-redux";

const initialState = { name: "", email: "", password: "", confirmPassword: "" };

const Profile = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const [form, setForm] = useState(initialState);
	const [showPassword, setShowPassword] = useState(false);

	const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

	useEffect(() => {
		let userData = user.result;
		if (userData) {
			userData.password = "";
			setForm(userData);
		}
	}, [user]);

	const submitUserForm = async () => {
		const { data } = await userApi.saveUser(form);
		dispatch({ type: AUTH, data });
	};

	const back = () => {
		if (user.result && user.result.role === "admin") {
			history.push("/admin/posts");
		} else {
			history.push("/posts");
		}
	};

	const handleShowPassword = () => setShowPassword(!showPassword);

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	return (
		<Paper style={{ padding: "50px", paddingTop: "10px" }}>
			<h1>Thay đổi thông tin cá nhân</h1>
			<Grid item xs={12}>
				<TextField
					name="name"
					label="Tên đầy đủ"
					type="text"
					variant="outlined"
					value={form.name}
					onChange={handleChange}
					required={true}
					fullWidth={true}
				/>
			</Grid>

			<Grid item xs={12}>
				<TextField
					name="email"
					label="Email"
					type="email"
					disabled={true}
					variant="outlined"
					value={form.email}
					onChange={handleChange}
					required={true}
					fullWidth={true}
				/>
			</Grid>

			<Input
				name="password"
				label="Mật khẩu"
				value={form.password}
				handleChange={handleChange}
				type={showPassword ? "text" : "password"}
				handleShowPassword={handleShowPassword}
			/>

			<Input
				name="confirmPassword"
				label="Nhập lại mật khẩu"
				value={form.confirmPassword}
				handleChange={handleChange}
				type="password"
			/>
			<DialogActions style={{ paddingRight: "25px", paddingBottom: "25px" }}>
				<Button onClick={back} color="primary">
					Hủy
				</Button>
				<button onClick={submitUserForm} className={"btn btn-primary"}>
					Lưu
				</button>
			</DialogActions>

			<hr />
		</Paper>
	);
};

export default Profile;
