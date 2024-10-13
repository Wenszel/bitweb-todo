import 'reflect-metadata';
import express, { Application } from 'express';

const PORT: number = 4000;
const app: Application = express();

app.listen(PORT, () => {
    console.log('Server is running on port PORT');
});
