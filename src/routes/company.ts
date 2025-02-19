import express from 'express';
import Company from '../models/Company';
import { Error } from 'mongoose';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const { status, type, sortBy = 'name', order = 'asc', page = 1, limit = 10 } = req.query;
        const filter: any = {};
        if (status) filter.status = status;
        if (type) filter.type = type;

        const companies = await Company.find(filter)
            .sort({ [sortBy as string]: order === 'desc' ? -1 : 1 })
            .skip((+page - 1) * +limit)
            .limit(+limit);

        res.json(companies);
    } catch (error) {
        res.status(500).json({ message: Error });
    }
});

router.post('/', async (req, res) => {
    const { name, type, status, address } = req.body;

    const newCompany = new Company({ name, type, status, address });
    try {
        const savedCompany = await newCompany.save();
        res.status(201).json(savedCompany);
    } catch (error) {
        res.status(400).json({ message: Error });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Company.findByIdAndDelete(req.params.id);
        res.json({ message: 'Company deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: Error });
    }
});

export default router;