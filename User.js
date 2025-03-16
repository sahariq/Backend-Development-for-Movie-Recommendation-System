const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the User schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Ensure usernames are unique
        trim: true,
        minlength: 3, // Minimum length for username
        maxlength: 30 // Maximum length for username
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure emails are unique
        trim: true,
        lowercase: true, // Convert email to lowercase
        validate: {
            validator: function(v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v); // Basic email validation
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // Minimum length for password
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Role can be either 'user' or 'admin'
        default: 'user' // Default role is 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically set the date when the document is created
    }
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

// Hash the password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next(); // Skip hashing if password is not modified
    }
    this.password = await bcrypt.hash(this.password, 10); // Hash the password with 10 salt rounds
    next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password); // Compare candidate password with hashed password
};

// Create the User model
const User = mongoose.model('User ', userSchema);

// Export the User model
module.exports = User;