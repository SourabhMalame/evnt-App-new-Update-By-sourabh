const express = require("express");
const compression = require('compression');
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const eventRoute = require("./routes/eventRoute");
const accountRoute = require("./routes/accountRoute");
const organiserRoute = require("./routes/organiserRoute");
const paymentRoute = require("./routes/paymentRoute");
const bankAccountRoutes = require("./routes/bankAccountRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const profileRoutes = require("./routes/profileRoutes");
const dignitaryRoute = require("./routes/dignitaryRoutes");
const coHostRoutes = require("./routes/cohostRoutes");
const cacheMiddleware = require("./middleware/cacheMiddleware");
const feedbackRoutes = require("./routes/feedbackRoutes")

const app = express();
app.use(compression());

// Set security HTTP headers
app.use(helmet());

// Body parser, reading data from body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
const corsOptions = {
    origin: "http://localhost:3500",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: "*",
};

app.use(cors(corsOptions));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// // Apply cache middleware to all GET routes
app.use(cacheMiddleware);

app.use("/api/v3/event", eventRoute);
app.use("/api/v3/account", accountRoute);
app.use("/api/v3/organiser", organiserRoute);
app.use("/api/v3/payment", paymentRoute);
app.use("/api/v3/bankAccounts", bankAccountRoutes);
app.use("/api/v3/booking", bookingRoutes);
app.use('/api/v3/profiles', profileRoutes);
app.use('/api/v3/dignitary', dignitaryRoute);
app.use("/api/v3/cohost", coHostRoutes);
app.use('/api/v3/feedback', feedbackRoutes);

module.exports = app;
