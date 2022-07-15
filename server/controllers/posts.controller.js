import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";
import User from "../models/user.js";

class PostController {
	async getPosts(req, res) {
		const { page } = req.query;

		try {
			const LIMIT = 8;
			const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

			const total = await PostMessage.countDocuments({});
			const posts = await PostMessage.find()
				.sort({ _id: -1 })
				.limit(LIMIT)
				.skip(startIndex);

			res.json({
				data: posts,
				currentPage: Number(page),
				numberOfPages: Math.ceil(total / LIMIT),
			});
		} catch (error) {
			res.status(404).json({ message: error.message });
		}
	}

	async getPostByQuery(req, res) {
		const { searchQuery, tags } = req.query;

		try {
			const title = new RegExp(searchQuery, "i");

			const posts = await PostMessage.find({
				$or: [{ title }, { tags: { $in: tags.split(",") } }],
			});

			res.json({ data: posts });
		} catch (error) {
			res.status(404).json({ message: error.message });
		}
	}

	async getPostsByCreator(req, res) {
		const { name } = req.query;

		try {
			const posts = await PostMessage.find({ name });

			res.json({ data: posts });
		} catch (error) {
			res.status(404).json({ message: error.message });
		}
	}

	async getPost(req, res) {
		const { id } = req.params;

		try {
			const post = await PostMessage.findById(id);

			res.status(200).json(post);
		} catch (error) {
			res.status(404).json({ message: error.message });
		}
	}

	async createPost(req, res) {
		const post = req.body;

		const newPostMessage = new PostMessage({
			...post,
			creator: req.userId,
			createdAt: new Date().toISOString(),
		});

		try {
			await newPostMessage.save();

			res.status(201).json(newPostMessage);
		} catch (error) {
			res.status(409).json({ message: error.message });
		}
	}

	async updatePost(req, res) {
		const { id } = req.params;
		const { title, message, creator, selectedFile, tags } = req.body;

		if (!mongoose.Types.ObjectId.isValid(id))
			return res.status(404).send(`No post with id: ${id}`);

		const updatedPost = {
			creator,
			title,
			message,
			tags,
			selectedFile,
			_id: id,
		};

		await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

		res.json(updatedPost);
	}

	async deletePost(req, res) {
		const { id } = req.params;

		if (!mongoose.Types.ObjectId.isValid(id))
			return res.status(404).send(`No post with id: ${id}`);

		await PostMessage.findByIdAndRemove(id);

		res.json({ message: "Post deleted successfully." });
	}

	async likePost(req, res) {
		const { id } = req.params;

		if (!req.userId) {
			return res.json({ message: "Unauthenticated" });
		}

		if (!mongoose.Types.ObjectId.isValid(id))
			return res.status(404).send(`No post with id: ${id}`);

		const post = await PostMessage.findById(id);

		const index = post.likes.findIndex((id) => id === String(req.userId));

		if (index === -1) {
			post.likes.push(req.userId);
		} else {
			post.likes = post.likes.filter((id) => id !== String(req.userId));
		}

		const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
			new: true,
		});

		res.status(200).json(updatedPost);
	}

	async commentPost(req, res) {
		const { id } = req.params;
		const { value } = req.body;

		const post = await PostMessage.findById(id);

		post.comments.push(value);

		const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
			new: true,
		});

		res.json(updatedPost);
	}

	async getAllPosts(req, res) {
		try {
			const posts = await PostMessage.find();

			const creatorIds = new Set(posts.map((post) => post.creator));
			const creators = await User.find({ _id: [...creatorIds] });

			const creatorById = new Map();
			for (let creatorsKey in creators) {
				creatorById.set(
					creators[creatorsKey]._id.toString(),
					creators[creatorsKey]
				);
			}

			for (let postsKey in posts) {
				if (creatorById.has(posts[postsKey].creator.toString())) {
					posts[postsKey].creator = creatorById.get(
						posts[postsKey].creator.toString()
					).name;
				}
			}

			res.json({ data: posts });
		} catch (error) {
			res.status(404).json({ message: error.message });
		}
	}
}

const postController = new PostController();

export default postController;
