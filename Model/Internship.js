const mongoose = require("mongoose");

const InternshipSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    Duration: { type: String, required: true },
    category: { type: String, required: true },
    aboutCompany: { type: String, required: true },
    aboutInternship: { type: String, required: true },
    Whocanapply: { type: String, required: true },
    perks: { type: [String], required: true },
    AdditionalInfo: { type: String, required: true },
    stipend: { type: String, required: true },
    StartDate: { type: String, required: true },
    createAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("Internship", InternshipSchema);
