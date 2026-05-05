require('dotenv').config();

const connectDB = require('../src/config/db');
const User = require('../src/models/User');
const Product = require('../src/models/Product');

const seed = async () => {
  try {
    await connectDB();

    const sampleUser = {
      name: 'Seed User',
      email: 'seed@example.com',
      password: 'password123',
    };

    // Remove existing seed user and products created by them
    const existing = await User.findOne({ email: sampleUser.email });
    if (existing) {
      await Product.deleteMany({ createdBy: existing._id });
      await User.deleteOne({ _id: existing._id });
      console.log('Removed existing seed user and their products');
    }

    const user = await User.create(sampleUser);
    console.log('Created seed user:', user.email);

    const products = [
      {
        name: 'Sample Product 1',
        description: 'This is a sample product used for seeding the database.',
        price: 19.99,
        category: 'Sample',
        stock: 10,
        imageUrl: '',
        createdBy: user._id,
      },
      {
        name: 'Sample Product 2',
        description: 'Another sample product for testing endpoints.',
        price: 29.99,
        category: 'Sample',
        stock: 5,
        imageUrl: '',
        createdBy: user._id,
      },
    ];

    const inserted = await Product.insertMany(products);
    console.log(`Inserted ${inserted.length} sample products`);

    console.log('Seeding completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seed();
