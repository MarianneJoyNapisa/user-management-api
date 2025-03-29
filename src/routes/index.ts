import express from 'express';
import userRoutes from '../user';

const app = express();
app.use(express.json());

app.use('/api', userRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
