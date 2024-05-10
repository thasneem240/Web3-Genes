const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');

const jwt = require('jsonwebtoken');
const { SHA3 } = require('sha3');
const cors = require('cors'); // Import the cors middleware in order to allow request from front end.


// express app
const app = express();

app.use(express.json());
app.use(cors()); // Enable CORS for all routes


// connect to mongodb
const dbURI = 'mongodb+srv://thasneem:test1234@cluster1.bgdo9i7.mongodb.net/userdb?retryWrites=true&w=majority&appName=Cluster1';

mongoose.connect(dbURI)
    .then((result) => app.listen(4000)) // listen for request at port 4000 afte Connected with mongoDB Server)
    .catch((err) =>console.log(err));



// API endpoint for login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
       
        // Find the user by email
        const user = await User.findOne({ 'contact_info.email': email });

        // If user not found, return error
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Hash the password input by the user using SHA-3-256
        const sha3Hash = new SHA3(256);
        sha3Hash.update(password);
        const hashedPassword = sha3Hash.digest('hex');

        // Compare hashed passwords
        if (hashedPassword !== user.auth_info.password) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // If user is ADMIN, generate JWT token
        if (user.type === 'ADMIN') {
            // Generate JWT token with user ID
            const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });

            // Return the token as response
            return res.status(200).json({ token });
        }

		
        // For other types of users, return unauthorized error
        return res.status(401).json({ error: 'Unauthorized' });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


// Route for creating ADMIN user (for testing purposes)
app.get('/create', async (req, res) => {
    try {
        const adminUser = new User({
            type: 'ADMIN',
            status: 'ACTIVE',
            basic_info: {
                first_name: 'Geeshan',
                last_name: 'Wije',
                dob: new Date('1995-04-23'),
                gender: 'MALE'
            },
            contact_info: {
                mobile_number: '291021333122',
                email: 'myemail@gmail.com'
            },
            auth_info: {
                password: 'admin' // Password is required for ADMIN users
            }
        });

       
        // Save the user
        await adminUser.save();

        console.log("Successfully created Admin User");
        return res.status(201).json({ message: 'Admin user created successfully' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});




// API endpoint for creating a new user by an ADMIN
app.post('/users', async (req, res) => {
    const { firstName, lastName, dob, gender, mobileNumber, email, password } = req.body;

    try {
        
        // Create a new user object
        const newUser = new User({
            type: 'USER', // Assuming the new user is of type USER
            status: 'ONBOARD', // When an ADMIN adds a USER, the initial status is ONBOARD
            basic_info: {
                first_name: firstName,
                last_name: lastName,
                dob: new Date(dob),
                gender: gender
            },
            contact_info: {
                mobile_number: mobileNumber,
                email: email
            },
            auth_info: {
                password: password // the password field should be empty.
            }
        });

        // Save the new user to the database
        await newUser.save();

        return res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});



// API endpoint for retrieving all users except ADMIN
app.get('/users', async (req, res) => {
    try {
        
        // Retrieve all users except those with the type ADMIN
        const users = await User.find({ type: { $ne: 'ADMIN' } }); // $ne (not equal) operator in the MongoDB query

        // Return the list of users as response
        return res.status(200).json(users);

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
