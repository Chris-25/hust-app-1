import mongoose from "mongoose";

const CONNECTION_URL =
	"mongodb+srv://vietduc:vietduc258@cluster0.x0pkd0u.mongodb.net/?retryWrites=true&w=majority";
async function connect() {
	try {
		await mongoose.connect(CONNECTION_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		mongoose.set("useFindAndModify", false);

		console.log("Connect database successfully");
	} catch (error) {
		console.log(error.message);
		console.log("Something went wrong!");
	}
}

export default connect;
