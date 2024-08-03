const Organiser = require('../models/organiserModel');

// Controller to create a new organiser
exports.createOrganiser = async (req, res) => {
    try {
        const newOrganiser = await Organiser.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                organiser: newOrganiser,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message,
        });
    }
};

// Controller to update organiser data
exports.updateData = async (req, res) => {
    try {
        // Ensure req.user is available and authenticated
        if (!req.user) {
            return res.status(401).json({
                status: 'fail',
                message: 'You must be logged in to update an organiser',
            });
        }

        const { id } = req.params;
        const updatedOrganiser = await Organiser.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedOrganiser) {
            return res.status(404).json({
                status: 'fail',
                message: 'Organiser not found',
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                organiser: updatedOrganiser,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message,
        });
    }
};

// Controller to add a single event ID to an organiser
exports.addEventIdToOrganiser = async (req, res) => {
    try {
        const { organiserId, eventId } = req.body;

        const updatedOrganiser = await Organiser.findByIdAndUpdate(
            organiserId,
            { $push: { eventIds: eventId } }, // Using $push to add the event ID to the array
            { new: true }
        );

        res.status(200).json({
            status: 'success',
            data: {
                organiser: updatedOrganiser,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message,
        });
    }
};


// Follow an organiser
exports.followOrganiser = async (req, res) => {
  try {
    const { organiserId, userId } = req.body;

    // Add the userId to the followers array of the organiser
    const organiser = await Organiser.findByIdAndUpdate(
      organiserId,
      { $addToSet: { followers: userId } },
      { new: true }
    );

    if (!organiser) {
      return res.status(404).json({ message: "Organiser not found" });
    }

    res.status(200).json({ message: "Successfully followed the organiser", organiser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Unfollow an organiser
exports.unfollowOrganiser = async (req, res) => {
  try {
    const { organiserId, userId } = req.body;

    // Remove the userId from the followers array of the organiser
    const organiser = await Organiser.findByIdAndUpdate(
      organiserId,
      { $pull: { followers: userId } },
      { new: true }
    );

    if (!organiser) {
      return res.status(404).json({ message: "Organiser not found" });
    }

    res.status(200).json({ message: "Successfully unfollowed the organiser", organiser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

