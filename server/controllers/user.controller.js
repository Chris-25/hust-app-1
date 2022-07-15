import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import UserModal from '../models/user.js';
import mongoose from 'mongoose';

const secret = 'test';

class UserController {
	async signin(req, res) {
		const { email, password } = req.body;

		try {
			const oldUser = await UserModal.findOne({ email });

			if (!oldUser)
				return res.status(404).json({ message: "User doesn't exist" });

			const isPasswordCorrect = await bcrypt.compare(
				password,
				oldUser.password
			);

			if (!isPasswordCorrect)
				return res.status(400).json({ message: 'Invalid credentials' });

			const token = jwt.sign(
				{ email: oldUser.email, id: oldUser._id },
				secret,
				{ expiresIn: '1h' }
			);

			res.status(200).json({ result: oldUser, token });
		} catch (err) {
			res.status(500).json({ message: 'Something went wrong' });
		}
	}

	async signup(req, res) {
		const { email, password, firstName, lastName } = req.body;

		try {
			const oldUser = await UserModal.findOne({ email });
			if (oldUser)
				return res.status(400).json({ message: 'User already exists' });
			const hashedPassword = await bcrypt.hash(password, 12);
			const result = await UserModal.create({
				email,
				password: hashedPassword,
				name: `${firstName} ${lastName}`,
				role: 'user',
			});

			const token = jwt.sign({ email: result.email, id: result._id }, secret, {
				expiresIn: '1h',
			});

			res.status(201).json({ result, token });
		} catch (error) {
			res.status(500).json({ message: 'Something went wrong' });

			console.log(error);
		}
	}

	async allUsers(req, res) {
		res.status(200).json(await UserModal.find());
	}

	async detailUser(req, res) {
		res.status(200).json(await UserModal.findById(req.params.id));
	}

	async save(req, res) {
		const { _id, email, password, firstName, lastName, role, name } = req.body;
		const hashedPassword = await bcrypt.hash(password, 12);

		let result;
		if (_id) {
			const oldUser = await UserModal.findById(_id);
			oldUser.email = email;
			if (password) {
				oldUser.password = hashedPassword;
			}
			oldUser.name = name ? name : `${firstName} ${lastName}`;
			oldUser.role = role;
			oldUser.save();
			result = oldUser;
		} else {
			console.log('vao day');
			const oldUser = await UserModal.findOne({ email });
			if (oldUser) {
				return res.status(400).json({ message: 'User already exists' });
			}
			result = await UserModal.create({
				email,
				password: hashedPassword,
				name: name ? name : `${firstName} ${lastName}`,
				role: role,
			});
		}

		res.status(201).json({ result });
	}

	async deleteUser(req, res) {
		const { id } = req.params;

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(404).send(`No user with id: ${id}`);
		}

		await UserModal.findByIdAndRemove(id);
		res.json({ message: 'User deleted successfully.' });
	}
}

const userController = new UserController();

export default userController;
