const mongoose = require('mongoose');

// Set the strictQuery option
mongoose.set('strictQuery', false);

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.DATABASE_URI);
	} catch (err) {
		console.log(err);
	}
};

module.exports = connectDB;
