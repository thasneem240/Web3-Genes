const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { SHA3 } = require('sha3');


// Define a schema for basic information
const basicInfoSchema = new Schema({
    first_name: String,
    last_name: String,
    dob: Date,
    gender: String
});


// Define a schema for contact information
const contactInfoSchema = new Schema({
    mobile_number: String,
    email: {
		type: String,
		lowercase: true,
		unique: true
	}
});

// Define a schema for authentication information
const authInfoSchema = new Schema({
    password: {

        type: String,
        // Allow empty password only for USER type users
        required: function() {
            return this.owner_type === 'USER';
        },
        minlength: 0 // Allow empty string as well
    }
});

// Define a schema for the main user
const userSchema = new Schema({
    type: {
        type: String,
        enum: ['ADMIN', 'USER'],
        required: true
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'ONBOARD', 'INACTIVE'],
        required: true
    },
    basic_info: {
        type: basicInfoSchema,
        required: true
    },
    contact_info: {
        type: contactInfoSchema,
        required: true
    },
    auth_info: {
        type: authInfoSchema,
        required: false // Password is not required at schema level
    }
});


// Pre-save middleware to hash the password before saving

userSchema.pre('save', function(next) {
    if (this.auth_info.password && this.isModified('auth_info.password')) {

        // Hash the password using SHA-3-256 algorithm
        const sha3Hash = new SHA3(256);
        sha3Hash.update(this.auth_info.password);
        this.auth_info.password = sha3Hash.digest('hex');

    }

    next();
});


const User = mongoose.model('User', userSchema);

module.exports = User;