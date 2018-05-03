const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Coin model
const Coin = require("../../models/Coin");
// Profile model
const Profile = require("../../models/Profile");

// Validation
const validateCoinInput = require("../../validation/coin");

// @route   GET api/coins/test
// @desc    Tests coin route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Coins Works" }));

// @route   GET api/coins
// @desc    Get coins
// @access  Public
router.get("/", (req, res) => {
  Coin.find()
    .sort({ date: -1 })
    .then(coins => res.json(coins))
    .catch(err => res.status(404).json({ nocoinsfound: "No coins found" }));
});

// @route   GET api/coins/:id
// @desc    Get coin by id
// @access  Public
router.get("/:id", (req, res) => {
  Coin.findById(req.params.id)
    .then(coin => res.json(coin))
    .catch(err =>
      res.status(404).json({ nocoinfound: "No coin found with that ID" })
    );
});

// @route   POST api/coins
// @desc    Create coin
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateCoinInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newCoin = new Coin({
      name: req.body.name,
      ticker: req.body.ticker,
      user: req.user.id
    });

    newCoin.save().then(coin => res.json(coin));
  }
);

// @route   DELETE api/coins/:id
// @desc    Delete coin
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Coin.findById(req.params.id)
        .then(coin => {
          // Check for coin owner
          if (coin.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          // Delete
          coin.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ coinnotfound: "No coin found" }));
    });
  }
);

module.exports = router;
