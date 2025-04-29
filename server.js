
import express from 'express';
import dotenv from 'dotenv';
import twilioWebhook from './twilioWebhook.js';

dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/test', async (req, res) => {
  res.json({ message: "Server is running." });
});

app.post('/twilioWebhook', twilioWebhook);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
