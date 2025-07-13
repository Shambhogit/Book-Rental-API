import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import userModels from '../models/user.models.js';

async function registerUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({
            success: false,
            message: 'Validation failed',
            errors: errors.array(),
        });
    }

    const { name, email, password, phone, address, role } = req.body;

    try {

        const existingUser = await userModels.findOne({ email });
        if (existingUser) {
            return res.status(409).send({
                success: false,
                message: 'Email already registered',
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await userModels.create({
            name,
            email,
            password: hashPassword,
            phone,
            address,
            role,
        });

        return res.status(201).send({
            success: true,
            message: 'User registered successfully',
        });

    } catch (error) {
        console.error('Register Error:', error);
        return res.status(500).send({
            success: false,
            message: 'Something went wrong. Please try again later.',
        });
    }
}

async function loginUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({
            success: false,
            message: 'Validation failed',
            errors: errors.array(),
        });
    }

    const { email, password } = req.body;

    try {

        const user = await userModels.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Invalid Credentials',
            });
        }

        bcrypt.compare(password)

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await userModels.create({
            name,
            email,
            password: hashPassword,
            phone,
            address,
            role,
        });

        return res.status(201).send({
            success: true,
            message: 'User registered successfully',
        });

    } catch (error) {
        console.error('Register Error:', error);
        return res.status(500).send({
            success: false,
            message: 'Something went wrong. Please try again later.',
        });
    }
}

export {
    registerUser,
    loginUser
};
