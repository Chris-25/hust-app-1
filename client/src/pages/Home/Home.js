import React, { useState } from "react";
import {
	Container,
	Grow,
	Grid,
	AppBar,
	TextField,
	Button,
	Paper,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

import { getPostByQuery } from "../../actions/posts";
import Posts from "../../components/Posts/Posts";
import Form from "../../components/Form/Form";
import Pagination from "../../components/Pagination";
import useStyles from "./styles";

function useQuery() {
	return new URLSearchParams(useLocation().search);
}
const Home = () => {
	const classes = useStyles();
	const query = useQuery();
	const page = query.get("page") || 1;
	const searchQuery = query.get("searchQuery");

	const [currentId, setCurrentId] = useState(0);
	const dispatch = useDispatch();

	const [search, setSearch] = useState("");
	const [tags, setTags] = useState([]);
	const history = useHistory();
	const [tag, setTag] = useState("");

	const searchPost = () => {
		if (search.trim() || tags) {
			// dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
			dispatch(getPostByQuery({ search, tags: tag }));
			//history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tag.join(',')}`);
			history.push(`/posts/search?searchQuery=${search || "none"}&tags=${tag}`);
		} else {
			history.push("/");
		}
	};

	const handleKeyPress = (e) => {
		if (e.keyCode === 13) {
			searchPost();
		}
	};

	const handleAddChip = (tag) => setTags([...tags, tag]);

	const handleDeleteChip = (chipToDelete) =>
		setTags(tags.filter((tag) => tag !== chipToDelete));

	const handleChange = (e) => {
		setTag(e.target.value);
	};

	return (
		<Grow in>
			<Container maxWidth="xl">
				<Grid
					container
					justify="space-between"
					alignItems="stretch"
					spacing={3}
					className={classes.gridContainer}
				>
					<Grid item xs={12} sm={6} md={9}>
						<Posts setCurrentId={setCurrentId} />
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<AppBar
							className={classes.appBarSearch}
							position="static"
							color="inherit"
						>
							<TextField
								onKeyDown={handleKeyPress}
								name="search"
								variant="outlined"
								label="Tìm kiếm bài đăng"
								fullWidth
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>
							<ChipInput
								style={{ margin: "10px 0" }}
								value={tags}
								onAdd={(chip) => handleAddChip(chip)}
								onDelete={(chip) => handleDeleteChip(chip)}
								label="Tìm kiếm chủ đề"
								variant="outlined"
							/>

							<FormControl fullWidth>
								<InputLabel id="demo-simple-select-label">Chủ đề</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={tag}
									label=" "
									onChange={handleChange}
								>
									<MenuItem value={"Điểm rèn luyện"}>Ten</MenuItem>
									<MenuItem value={"Học bổng"}>Twenty</MenuItem>
									<MenuItem value={30}>Thirty</MenuItem>
								</Select>
							</FormControl>

							<Button
								onClick={searchPost}
								className={classes.searchButton}
								variant="contained"
								color="primary"
							>
								Tìm kiếm
							</Button>
						</AppBar>
						<Form currentId={currentId} setCurrentId={setCurrentId} />
						{!searchQuery && !tags.length && (
							<Paper className={classes.pagination} elevation={6}>
								<Pagination page={page} />
							</Paper>
						)}
					</Grid>
				</Grid>
			</Container>
		</Grow>
	);
};

export default Home;
