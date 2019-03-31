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
  tags: [String],
  created: {
    type: Date,
    default: Date.now
  },
  location: {
    type: {
      type: String,
      default: "Point"
    },
    coordinates: [
      {
        type: Number,
        required: "You must supply coordinates!"
      }
    ],
    address: {
      type: String,
      required: "You must supply an address!"
    }
  },
  photo: String,
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: "You mst supply an author"
  }
});

storeSchema.pre("save", async function(next) {
  if (!this.isModified("name")) {
    next(); //skip it
    return; //stop this function from runing
  }
  this.slug = slug(this.name);
  //find others that have a slug of the same
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, "i");
  const storesWithSlug = await this.constructor.find({ slug: slugRegEx });
  if (storesWithSlug.length) {
    this.slug = `${this.slug}-${storesWithSlug.length + 1}`;
  }
  next();
  //todo make more resilant so slugs are unique
});

storeSchema.statics.getTagsList = function() {
  return this.aggregate([
    { $unwind: "$tags" },
    { $group: { _id: "$tags", count: { $sum: 1 } } },
    //1 ascending -1 descending
    { $sort: { count: -1 } }
  ]);
};

module.exports = mongoose.model("Store", storeSchema);
