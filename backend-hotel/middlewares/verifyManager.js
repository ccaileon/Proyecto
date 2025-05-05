// middlewares/verifyManager.js
module.exports = (req, res, next) => {
  if (req.user.emp_role !== "manager") {
    return res
      .status(403)
      .json({ error: "Access denied. Manager role required." });
  }
  next();
};
