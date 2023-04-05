const express = require("express");
const router = express.Router();
const Tests = require("../models/testsModel");
const authMiddleware = require("../middlewares/authMiddleware");


// ------------------------------------------------------------------
// This API used by user panal to show only his test appoiment status
// ------------------------------------------------------------------

router.get("/get-test-by-user-id", authMiddleware, async (req, res) => {
  try {
    const tests = await Tests.find({userId: req.body.userId });
    res.status(200).send({
      message: "Tests fetched successfully",
      success: true,
      data: tests,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in fetching Tests",
      success: false,
      error,
    });
  }
});

// -------------------------------------------------------
// This API used for fecthing all the Test Collection data
// -------------------------------------------------------

router.get("/get-all-tests", authMiddleware, async (req, res) => {
  try {
    const tests = await Tests.find({});
    res.status(200).send({
      message: "Tests fetched successfully",
      success: true,
      data: tests,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error in fetching Tests",
      success: false,
      error,
    });
  }
});



module.exports = router;
