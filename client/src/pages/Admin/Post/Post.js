import React, { useEffect, useState } from "react";
import { Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { deletePost, getAllPosts } from "../../../actions/posts";
import { useHistory } from "react-router-dom";

const Post = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
	const [currentDeleteId, setCurrentDeleteId] = useState(false);

	useEffect(() => {
		dispatch(getAllPosts());
	}, [dispatch]);

	const handleOpenConfirmDeleteDialog = (_id) => {
		setCurrentDeleteId(_id);
		setOpenConfirmDelete(true);
	};
	const handleCloseConfirmDeleteDialog = () => setOpenConfirmDelete(false);

	const submitDelete = () => {
		dispatch(deletePost(currentDeleteId));
		handleCloseConfirmDeleteDialog();
	};

	const detailPost = (_id) => {
		history.push("/posts/" + _id);
	};

	const userManagement = () => {
		history.push("/admin/users");
	};

	const { posts } = useSelector((state) => state.posts);

	return (
		<Paper style={{ padding: "50px", paddingTop: "10px" }}>
			<span
				style={{
					textDecoration: "underline",
					cursor: "pointer",
					color: "#007bff",
				}}
				onClick={userManagement}
			>
				Quản lý sinh viên
			</span>

			<h1>Quản lý bài viết</h1>

			<table style={{ width: "100%", textAlign: "left" }}>
				<thead>
					<tr>
						<th style={{ width: "350px" }}>Tiêu đề</th>
						<th style={{ width: "500px" }}>Nội dung</th>
						<th>Người đăng</th>
						<th>Tác vụ</th>
					</tr>
				</thead>
				{posts.length > 0 && (
					<tbody>
						{posts.map((post) => {
							return (
								<tr key={post._id}>
									<td>{post.title}</td>
									<td>{post.message}</td>
									<td>{post.creator}</td>
									<td>
										<div className="actions">
											<button
												className={"btn btn-primary"}
												style={{ marginRight: "5px" }}
												onClick={() => detailPost(post._id)}
											>
												Chi tiết
											</button>
											<button
												className={"btn btn-danger"}
												onClick={() => handleOpenConfirmDeleteDialog(post._id)}
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
				open={openConfirmDelete}
				onClose={handleCloseConfirmDeleteDialog}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">Delete Post</DialogTitle>
				<DialogContent>
					<DialogContentText>Are you sure to delete this?</DialogContentText>
				</DialogContent>
				<DialogActions style={{ paddingRight: "25px", paddingBottom: "25px" }}>
					<Button onClick={handleCloseConfirmDeleteDialog} color="primary">
						Cancel
					</Button>
					<button className={"btn btn-danger"} onClick={submitDelete}>
						Delete
					</button>
				</DialogActions>
			</Dialog>
		</Paper>
	);
};

export default Post;
