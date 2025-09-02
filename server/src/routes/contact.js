import express from 'express';
import Joi from 'joi';
import nodemailer from 'nodemailer';

export const router = express.Router();

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  message: Joi.string().min(10).required()
});

router.post('/', async (req, res) => {
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: error.message });
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
  });
  await transporter.sendMail({
    from: process.env.SMTP_FROM || 'Department <noreply@university.edu>',
    to: process.env.SMTP_TO || process.env.SMTP_USER,
    subject: `Contact form: ${value.name}`,
    replyTo: value.email,
    text: value.message
  });
  res.json({ ok: true });
});

export default router;


