//INSTALL npm install express-async-handler

//the controllers contains the logic of the backend which interacts with the our database in this case mongodb

const asyncHandler =require("express-async-handler");
const Contact=require("../models/contactModel");

//@desc Get all contacts
//@route Get /api/contacts
//@desc access private
//returning of the contacts from the database 
const getContacts= asyncHandler(async(req,res)=>{
    const contacts=await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);

});

//@desc create new contacts
//@route POST /api/contacts
//@desc access private
//checking if if the request body consisting of email,name and phone is provided and reurning the created body in json format
const createContact =asyncHandler(async (req,res)=>{
    console.log("The request body is :",req.body);
    //the json request body contains name,email and phone for POST request to create a contact
    const{name,email,phone}=req.body;
    if(!name | !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const contact=await Contact.create({
        name,
        email,
        phone,
    });
    res.status(201).json(contact );

});

//@desc Get contact
//@route GET /api/contacts/:id 
//@desc access private
//find the contact by id and return it 
const getContact =asyncHandler(async (req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error("Contact not Found");
    }
    res.status(201).json(contact);

});

//@desc update  contact
//@route PUT /api/contacts/:id
//@desc access public
//find the contact and update the contact and return the updated contact
const updateContact =asyncHandler(async (req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error("Contact not Found");
    }

  //checking if user_id from database of contact is equal to request.user.id this code is included if there is a auth component
    if(contact.user_id.toString() !== req.user.id ){
        res.status(403);
        throw new Error("User unauthorized to update other contacts ")
    }

    const updatedContact=await Contact.findByIdAndupdate(
        req.params.id,
        req.body,
        {new:true}
    ); 
    res.status(200).json(updatedContact);
  
});

//@desc delete  contact
//@route DELETE /api/contacts/:id
//@desc access public
//finding the contact first and remove it ie. thats the code in short
const deleteContact = asyncHandler(async(req,res)=>{
    const contact=await Contact.findById(req.params.id);
    if (!contact){
        res.status(404);
        throw new Error("Contact not Found");
    }

 //checking if user_id from database of contact is equal to request.user.id,this code is included if there is auth component
    if(contact.user_id.toString() !==req.user.id ){
        res.status(403);
        throw new Error("User unauthorized to delete other contacts ")
    }

    await Contact.deleteOne({_id:req.params.id});
    res.status(200).json(contact);
  
});

module.exports={
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
};