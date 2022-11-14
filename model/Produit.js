const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ProduitSchema = new Schema(
  {
    libelle: { type: String, required: false },
    prix: { type: Number, required: false },
    description: { type: String, required: false },
    quantite: { type: Number, required: false },
    instock: { type: Boolean, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Produit", ProduitSchema);