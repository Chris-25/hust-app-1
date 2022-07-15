import React, { useState, useEffect } from "react";
import {
	Grid,
	IconButton,
	InputAdornment,
	MenuItem,
	Paper,
	Select,
	TextField,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, deleteUser, saveUser } from "../../../actions/user";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Input from "../../Auth/Input";
import userApi from "../../../api/user";
import { useHistory } from "react-router-dom";

const initialState = {
	name: "",
	email: "",
	password: "",
	confirmPassword: "",
	role: "user",
};

const User = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const [form, setForm] = useState(initialState);
	const [openForm, setOpenForm] = useState(false);
	const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
	const [currentDeleteId, setCurrentDeleteId] = useState(false);
	const [currentEditId, setCurrentEditId] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	useEffect(() => {
		dispatch(getUsers());
	}, [dispatch]);

	const handleClickOpenForm = () => setOpenForm(true);
	const handleCloseForm = () => {
		setCurrentEditId(null);
		setOpenForm(false);
	};

	const handleOpenConfirmDeleteDialog = (_id) => {
		setCurrentDeleteId(_id);
		setOpenConfirmDelete(true);
	};
	const handleCloseConfirmDeleteDialog = () => setOpenConfirmDelete(false);

	const handleOpenUpdateForm = async (_id) => {
		setCurrentEditId(_id);
		let detailUser = await userApi.detailUser(_id);
		detailUser.data.password = "";
		await setForm(detailUser.data);
		setOpenForm(true);
	};

	const submitDelete = () => {
		dispatch(deleteUser(currentDeleteId));
		handleCloseConfirmDeleteDialog();
	};

	const submitUserForm = () => {
		if (currentEditId) {
			form._id = currentEditId;
		}
		dispatch(saveUser(form));
		handleCloseForm();
	};

	const handleShowPassword = () => setShowPassword(!showPassword);

	const { users } = useSelector((state) => state.users);
	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const postManagement = () => {
		history.push("/admin/posts");
	};

	return (
		<Paper style={{ padding: "50px", paddingTop: "10px" }}>
			<span
				style={{
					textDecoration: "underline",
					cursor: "pointer",
					color: "#007bff",
				}}
				onClick={postManagement}
			>
				Quản lý bài viết
			</span>

			<h1>Quản lý sinh viên</h1>

			<button
				className={"btn btn-primary"}
				onClick={handleClickOpenForm}
				style={{ marginRight: "5px", float: "right", marginBottom: "10px" }}
			>
				+ Thêm sinh viên
			</button>

			<table style={{ width: "100%", textAlign: "left" }}>
				<thead>
					<tr>
						<th>Tên đầy đủ</th>
						<th>Email</th>
						<th>Vai trò</th>
						<th>Tác vụ</th>
					</tr>
				</thead>
				{users.length > 0 && (
					<tbody>
						{users.map((user) => {
							return (
								<tr key={user._id}>
									<td>{user.name}</td>
									<td>{user.email}</td>
									<td>{user.role?.toUpperCase()}</td>
									<td>
										<div className="actions">
											<button
												className={"btn btn-primary"}
												style={{ marginRight: "5px" }}
												onClick={() => handleOpenUpdateForm(user._id)}
											>
												Chỉnh sửa
											</button>
											<button
												className={"btn btn-danger"}
												onClick={() => handleOpenConfirmDeleteDialog(user._id)}
											>
												Xóa
											</button>
										</div>
									</td>
								</tr>
							);
						})}
					</tbody>
				)}
			</table>

			<Dialog
				fullWidth={true}
				style={{ height: "600px" }}
				open={openForm}
				onClose={handleCloseForm}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">
					{!currentEditId ? "Add User" : "Update User"}
				</DialogTitle>
				<DialogContent>
					<Grid item xs={12}>
						<TextField
							name="name"
							label="Full name"
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
							label="Email Address"
							type="email"
							disabled={!!currentEditId}
							variant="outlined"
							value={form.email}
							onChange={handleChange}
							required={true}
							fullWidth={true}
						/>
					</Grid>

					<Input
						name="password"
						label="Password"
						value={form.password}
						handleChange={handleChange}
						type={showPassword ? "text" : "password"}
						handleShowPassword={handleShowPassword}
					/>

					<Input
						name="confirmPassword"
						label="Repeat Password"
						value={form.confirmPassword}
						handleChange={handleChange}
						type="password"
					/>

					<Grid item xs={12}>
						<Select
							onChange={handleChange}
							variant="outlined"
							required
							name="role"
							fullWidth
							label="Role"
							defaultValue="user"
							value={form.role}
							autoFocus={false}
						>
							<MenuItem value="user">USER</MenuItem>
							<MenuItem value="admin">ADMIN</MenuItem>
						</Select>
					</Grid>
				</DialogContent>
				<DialogActions style={{ paddingRight: "25px", paddingBottom: "25px" }}>
					<Button onClick={handleCloseForm} color="primary">
						Hủy
					</Button>
					<button onClick={submitUserForm} className={"btn btn-primary"}>
						Lưu
					</button>
				</DialogActions>
			</Dialog>

			<Dialog
				open={openConfirmDelete}
				onClose={handleCloseConfirmDeleteDialog}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">Xóa </DialogTitle>
				<DialogContent>
					<DialogContentText>Bạn chắc chắn muốn xóa?</DialogContentText>
				</DialogContent>
				<DialogActions style={{ paddingRight: "25px", paddingBottom: "25px" }}>
					<Button onClick={handleCloseConfirmDeleteDialog} color="primary">
						Hủy
					</Button>
					<button className={"btn btn-danger"} onClick={submitDelete}>
						Xóa
					</button>
				</DialogActions>
			</Dialog>
		</Paper>
	);
};

export default User;
