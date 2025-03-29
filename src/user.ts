import { Router } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities/User';

const router = Router();

router.post('/users', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const userRepository = getRepository(User);
        const newUser = userRepository.create({ name, email, password });

        await userRepository.save(newUser);

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
});

export default router;
