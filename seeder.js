const users = require('./data/users');
const Users = require('./model/userModel');
const products = require('./data/product');
const Products = require('./model/productModel');
const connectDB = require('./config/db');


connectDB();


const importData = async() => {
    try {
        await Users.deleteMany();
        await Users.insertMany(users);
        const userAdmin = await Users.findOne({ email: 'admin4@gmail.com' });
        const sampleProducts = products.map((product) => {
            return {...product, user: userAdmin._id }
        });
        await Products.deleteMany();
        await Products.insertMany(sampleProducts);
        console.log('insert successful');
    } catch (error) {
        console.log('Fail', error);
    }
}




importData();