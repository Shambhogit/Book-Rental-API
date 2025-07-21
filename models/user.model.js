import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email']
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        select: false
    },
    phone: {
        type: String,
        trim: true,
        match: [/^\d{10}$/, 'Invalid phone number']
    },
    address: {
        // street: String,
        // city: String,
        // state: String,
        // country: String,
        // zip: String

        type:String,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

userSchema.index({ email: 1 }, { unique: true });

export default mongoose.model('User', userSchema);
