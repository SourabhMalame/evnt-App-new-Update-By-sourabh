// middleware/cacheMiddleware.js
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 3600 }); // Cache for 1 hour (3600 seconds)

const cacheMiddleware = (req, res, next) => {
    if (req.method === "GET") {
        const key = req.originalUrl;
        const cachedResponse = cache.get(key);
        console.log("this is get Method")

        if (cachedResponse) {
            // Return cached response if it exists
            return res.status(200).json(cachedResponse);
        }

        // Store the response in a variable to cache it later
        res.sendResponse = res.json;
        res.json = (body) => {
            cache.set(key, body);
            res.sendResponse(body);
        };
    }

    next();
};

module.exports = cacheMiddleware;
