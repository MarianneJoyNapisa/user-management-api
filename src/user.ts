import { Router } from 'express';
import { getRepository } from 'typeorm';
import { User } from './entity/User';
import bcrypt from 'bcryptjs';

const router = Router();

router.post('/users', async (req, res) => {
    try {
        const { title, firstName, lastName, email, password, role } = req.body;

        // Validate input
        if (!title || !firstName || !lastName || !email || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Hash the password
        const passwordHash = await bcrypt.hash(password, 10);

        const userRepository = getRepository(User);
        const newUser = userRepository.create({
            title,
            firstName,
            lastName,
            email,
            passwordHash,
            role,
        });

        await userRepository.save(newUser);

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
});

export default router;
