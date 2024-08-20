const Event = require('../models/eventModel');
const { ObjectId } = require('mongoose').Types;
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour (3600 seconds)

// Controller to create a new event
exports.createEvent = async (req, res) => {
    try {
        const newEvent = await Event.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                event: newEvent,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message,
        });
    }
};

// Controller to get all events
exports.getAllEvent = async (req, res) => {
    try {
        const cacheKey = `events_${JSON.stringify(req.query)}`;
        const cachedEvents = cache.get(cacheKey);

        if (cachedEvents) {
            return res.status(200).json({
                status: 'success',
                data: {
                    events: cachedEvents.events,
                    totalPages: cachedEvents.totalPages,
                    currentPage: cachedEvents.currentPage,
                    totalEvents: cachedEvents.totalEvents
                },
            });
        }

        // Pagination settings
        const { page = 1, limit = 5 } = req.query; // Default to 5 results per page
        const pageNumber = parseInt(page);
        const pageSize = parseInt(limit);

        // Get the total number of events
        const totalEvents = await Event.countDocuments();

        // Fetch the events for the current page with detailed fields
        const events = await Event.find({}, 'field1 field2 _id') // Include fields you want
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize);

        // Calculate the total number of pages
        const totalPages = Math.ceil(totalEvents / pageSize);

        // Cache the results along with pagination info
        cache.set(cacheKey, {
            events,
            totalPages,
            currentPage: pageNumber,
            totalEvents
        });

        res.status(200).json({
            status: 'success',
            data: {
                events,
                totalPages,
                currentPage: pageNumber,
                totalEvents
            },
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message,
        });
    }
};

// exports.getAllEvent = async (req, res) => {
//     try {
//         const cacheKey = 'allEvents'; // Define a cache key
//         const cachedEvents = cache.get(cacheKey);

//         if (cachedEvents) {
//             // Return cached response if it exists
//             return res.status(200).json({
//                 status: 'success',
//                 data: {
//                     events: cachedEvents,
//                 },
//             });
//         }

//         // If not cached, fetch from the database
//         const events = await Event.find();

//         // Cache the response
//         cache.set(cacheKey, events);

//         res.status(200).json({
//             status: 'success',
//             data: {
//                 events,
//             },
//         });
//     } catch (error) {
//         res.status(500).json({
//             status: 'fail',
//             message: error.message,
//         });
//     }
// };


// Controller to get a single event by its ID
exports.getEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.eventId);
        if (!event) {
            return res.status(404).json({
                status: 'fail',
                message: 'No event found with that ID',
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                event,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message,
        });
    }
};

// Controller to get events by location and keyword
exports.getEventParticular = async (req, res) => {
    try {
        const { location, keyword } = req.params;
        const events = await Event.find({
            location: { $regex: location, $options: 'i' },
            title: { $regex: keyword, $options: 'i' },
        });
        res.status(200).json({
            status: 'success',
            data: {
                events,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message,
        });
    }
};

// Controller to get events by price
exports.getEventsbyPrice = async (req, res) => {
    try {
        const eventPrice = req.params.eventPrice;
        const events = await Event.find({ price: eventPrice });
        res.status(200).json({
            status: 'success',
            data: {
                events,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message,
        });
    }
};

// Controller to get events by properties keyword
exports.getEventsByProps = async (req, res) => {
    try {
        const propsKeyword = req.params.propsKeyword;
        const events = await Event.find({
            properties: { $regex: propsKeyword, $options: 'i' },
        });
        res.status(200).json({
            status: 'success',
            data: {
                events,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message,
        });
    }
};

// Controller to get all event types
exports.getAllEventTypes = async (req, res) => {
    try {
        const eventTypes = await Event.distinct('type');
        res.status(200).json({
            status: 'success',
            data: {
                eventTypes,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message,
        });
    }
};

// Controller to get all event IDs
exports.getAllEventIds = async (req, res) => {
    try {
        const eventIds = await Event.find().select('_id');
        res.status(200).json({
            status: 'success',
            data: {
                eventIds,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message,
        });
    }
};

// Controller to get event by eventId
exports.getEventbyEventId = async (req, res) => {
    try {
        const event = await Event.findOne({ eventId: req.params.evtId });
        if (!event) {
            return res.status(404).json({
                status: 'fail',
                message: 'No event found with that eventId',
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                event,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message,
        });
    }
};

// Controller to delete an event
exports.deleteEvent = async (req, res) => {
    try {
        const { id } = req.params; // Get the event ID from request parameters

        // Find and delete the event by ID
        const event = await Event.findByIdAndDelete(id);

        // If no event is found, return a 404 status
        if (!event) {
            return res.status(404).json({
                status: 'fail',
                message: 'Event not found',
            });
        }

        // Return a success response with a message
        res.status(200).json({
            status: 'success',
            message: 'Event successfully deleted',
        });

    } catch (error) {
        // Handle any errors that occur
        console.error('Error deleting event:', error); // Log the error for debugging
        res.status(500).json({
            status: 'error',
            message: 'Server error occurred while deleting event',
            error: error.message
        });
    }
};
