var express = require('express');
const Produit = require("../model/Produit");
const { StatusCodes } = require("http-status-codes");
var router = express.Router();

/* GET produit listing. */
router.get("/", async function (req, res, next) {
  const products = await Produit.find();
  res.render("product", { products });
});

router.post("/addproduct", async function (req, res, next) {
  const { libelle, prix, description, quantite, instock} = req.body;
  //instock = true;
  console.log({ libelle, prix, description, quantite, instock});

  try {
    const checkIfProductExists = await Produit.find({ libelle: libelle });
    if(checkIfProductExists.length===0){
      const produit = new Produit({ libelle, prix, description, quantite, instock });
      const addedproduct = await produit.save();
    }
    console.log(checkIfProductExists);
    res.redirect("/products");

  } catch (error) {
    res.json(error.message);
  }
});

router.get("/deleteproduit/:id", async function (req, res, next) {
  const { id } = req.params;
  console.log(id);
  try {
    
    await Produit.findOneAndDelete({ _id: id });
    res.redirect("http://localhost:3000/products");
  } catch (error) {
    res.json(error.message);
  }
});

router.put("/update/:Id", async function (req, res, next) {
  try {
    const { Id } = req.params;
    const { libelle,
      prix,
      description,
      quantite,
      instock 
    } = req.body;
    const checkIfExist = await Produit.findById(Id).lean();
    if (!checkIfExist) {
      throw new Error("product not found");
    }
    const product = await Produit.findByIdAndUpdate(
      Id,
      { 
        libelle,
        prix,
        description,
        quantite,
        instock 
      },
      { new: true }
    );

    res.status(StatusCodes.OK).json(product);
  } catch (err) {

    res.status(StatusCodes.NOT_FOUND).json({ message: err.message });
  }
});

router.get('/notif', async function(req, res, next){
  res.render("notification");
})

module.exports = router;