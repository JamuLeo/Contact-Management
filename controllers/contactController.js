// INSTALL npm install express-async-handler

// The controllers contain the logic of the backend, which interacts with the database (MongoDB).

const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// @desc Get all contacts
// @route GET /api/contacts
// @access Private
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts);
});

// @desc Create new contact
// @route POST /api/contacts
// @access Private
const createContact = asyncHandler(async (req, res) => {
    console.log("Incoming request:", req.method, req.url, "Body:", req.body);

    // Extract fields from request body
    const { name, email, phone } = req.body;

    // Validate required fields
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    // Create new contact
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id, // Ensure contacts are linked to users
    });

    res.status(201).json(contact);
});

// @desc Get a single contact
// @route GET /api/contacts/:id
// @access Private
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    res.status(200).json(contact);
});

// @desc Update contact
// @route PUT /api/contacts/:id
// @access Private
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    // Check if the user owns this contact
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User unauthorized to update this contact");
    }

    // Update the contact
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    res.status(200).json(updatedContact);
});

// @desc Delete contact
// @route DELETE /api/contacts/:id
// @access Private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    // Check if the user owns this contact
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User unauthorized to delete this contact");
    }

    // Delete the contact
    await Contact.deleteOne({ _id: req.params.id });

    res.status(200).json({ message: "Contact deleted successfully", contact });
});

module.exports = {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact,
};
