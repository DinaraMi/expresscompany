import express from 'express';
import Contact from '../models/Contact';
import { Error } from 'mongoose';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find().populate('companyId', 'name');
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: Error });
    }
});

router.post('/', async (req, res) => {
    const { name, email, phone, companyId } = req.body;

    const newContact = new Contact({ name, email, phone, companyId });
    try {
        const savedContact = await newContact.save();
        res.status(201).json(savedContact);
    } catch (error) {
        res.status(400).json({ message: Error });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.json({ message: 'Contact deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: Error });
    }
});

export default router;