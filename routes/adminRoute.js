const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Doctor = require("../models/doctorModel");
const Tests = require("../models/testsModel");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/get-all-doctors", authMiddleware, async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.status(200).send({
      message: "Doctors fetched successfully",
      success: true,
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying doctor account",
      success: false,
      error,
    });
  }
});



router.get("/get-all-users", authMiddleware, async (req, res) => {
  try {
    const users = await User.find({isDoctor:false , isAdmin:false});
    res.status(200).send({
      message: "Users fetched successfully",
      success: true,
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying doctor account",
      success: false,
      error,
    });
  }
});

// -------------------------------------------------------------------------
// API for changing the doctor account status ( approved , block , unblock )
// -------------------------------------------------------------------------

router.post("/change-doctor-account-status", authMiddleware, async (req, res) => {
    try {
      const { doctorId, status } = req.body;
      // Doctor model me status update 
      const doctor = await Doctor.findByIdAndUpdate(doctorId, {status });

      const user = await User.findOne({ _id: doctor.userId });
      const unseenNotifications = user.unseenNotifications;

      unseenNotifications.push({
        type: "new-doctor-request-changed",
        message: `Your doctor account has been ${status}`,
        onClickPath: "/notifications",
      });

      user.isDoctor = status === "approved" ? true : false;
      await user.save();
      res.status(200).send({
        message: "Doctor account status updated successfully",
        success: true,
        data: doctor,
      });

    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error changning doctor account status",
        success: false,
        error,
      });
    }
  }
);

// -------------------------------------------------------------------------
// API for changing the user account status ( approved , block , unblock )
// -------------------------------------------------------------------------

router.post("/change-user-account-status", authMiddleware, async (req, res) => {
    try {
      const user = await User.findOne({email: req.body.email  });
      const userStatus = req.body.status;
      await user.updateOne({status:userStatus})

      res
      .status(200)
      .send({ message: "user account status updated successfully", success: true });

    } catch (error) {
      console.log(error);
      res
      .status(500)
      .send({ message: "Error changing in user account status", success: false, error });
    }
  }
);

// --------------------------------
// Changing the Test Booking status
// --------------------------------

router.post( "/change-user-test-status", authMiddleware, async (req, res) => {
    try {
      const { testsId, status } = req.body;
      const tests = await Tests.findByIdAndUpdate(testsId, { status });
      const user = await User.findOne({ _id: tests.userId });

      const unseenNotifications = user.unseenNotifications;
      unseenNotifications.push({
        type: "new-Test-request-changed",
        message: `Your Test booking status has been ${status}`,
        onClickPath: "/notifications",
      });
      
      await user.save();

      res.status(200).send({
        message: "Test Booking status updated successfully",
        success: true,
        data: tests,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error in chnaging the Test Booking status",
        success: false,
        error,
      });
    }
  }
);


module.exports = router;
