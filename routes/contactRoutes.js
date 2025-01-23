const express= require("express");
const router =express.Router();
const{getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
}=require("../controllers/contactController");
const validateToken=require("../middleware/validateTokenHandler"); //this is imported to protect routes

router.use(validateToken);//making all routes private
router.route("/").get(getContacts);

router.route("/").post(createContact);

router.route("/:id").get(getContact);

router.route("/:id").put(updateContact);

router.route("/:id").delete(deleteContact);

/*
those controllers can also be written as follows(alternative way ie.)

router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

*/
module.exports=router;