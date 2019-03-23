exports.myMiddleware = (req, res, next) => {
  req.name = "jake";
  if (req.name === "jake") {
    throw Error("That is a stupid name");
  }
  next();
};
exports.homePage = (req, res) => {
  console.log(req.name);
  res.render("index");
};
