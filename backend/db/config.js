const mongoose = require("mongoose")
// mongoose.connect("mongodb://localhost:27017/e-commerce")

async function connectToDatabase() {
  try {    
    await mongoose.connect('mongodb://127.0.0.1/e-commerce', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToDatabase();
