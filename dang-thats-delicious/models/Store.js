const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const slug = require("slugs");

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Please enter a store name!"
  },
  slug: String,
  description: {
    type: String,
    trime: true
  },
  tags: [String]
});

storeSchema.pre("save", function(next) {
  if (!this.isModified("name")) {
    next(); //skip it
    return; //stop this function from runing
  }
  this.slug = slug(this.name);
  next();
  //todo make more resilant so slugs are unique
});

module.exports = mongoose.model("Store", storeSchema);
