import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    status: { type: String, required: true },
    address: { type: String, required: false },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Company', CompanySchema);