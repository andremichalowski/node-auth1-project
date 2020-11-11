module.exports = (req, res, next) => {
  if(req.session.username) {
    // console.log("session", req.session);
    next();
  } else {
    res.status(400).json({ you: "cannot pass!"})
  }
};

