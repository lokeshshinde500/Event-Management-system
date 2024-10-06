import eventModel from "../models/eventModel.js";
import { uploadImage } from "../utils/uploadImage.js";

// create event //
export const create = async (req, res) => {
  try {
    const { title, description, location, maxAttendees, date } = req.body;

    // All fields are required
    if (!title || !description || !location || !maxAttendees || !date) {
      return res
        .status(400)
        .json({ message: "All fields are required!", success: false });
    }

    // image required
    const image = req.file;
    if (!image) {
      return res
        .status(400)
        .json({ message: "Image required!", success: false });
    }

    const result = await uploadImage(image.path);

    const newEvent = {
      title,
      description,
      location,
      date,
      maxAttendees,
      image: result.secure_url,
      created_by: req.user.id,
    };

    const createEvent = await eventModel.create(newEvent);

    return res.status(201).json({
      message: "event created successfully.",
      event: createEvent,
      success: true,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error!", success: false });
  }
};

// get all events and filter based on title/description/date/location //
export const getAllEvents = async (req, res) => {
  try {
    const filterQuery = {};

    if (req.query.date) filterQuery.date = new Date(req.query.date);
    if (req.query.location) filterQuery.location = req.query.location;

    if (req.query.search) {
      const searchRegex = new RegExp(req.query.search, "i");
      filterQuery.$or = [
        { title: { $regex: searchRegex } },
        { description: { $regex: searchRegex } },
      ];
    }

    const events = await eventModel.find(filterQuery);

    if (!events.length) {
      return res
        .status(404)
        .json({ message: "events not found!", success: false });
    }

    return res.status(200).json({ events: events, success: true });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ message: "Internal server error!", success: false });
  }
};

// get all events of spacific user //
export const getEventsOfUser = async (req, res) => {
  try {
    const events = await eventModel.find({ created_by: req.user.id });

    if (!events) {
      return res
        .status(404)
        .json({ message: "events not found!", success: false });
    }

    return res.status(200).json({ events: events, success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error!", success: false });
  }
};

// get single event by id //
export const getEvent = async (req, res) => {
  try {
    const event = await eventModel.findById(req.params.id);

    if (!event) {
      return res
        .status(404)
        .json({ message: "event not found!", success: false });
    }

    return res.status(200).json({ event: event, success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error!", success: false });
  }
};

// delete event by id //
export const deleteEvent = async (req, res) => {
  try {
    const event = await eventModel.findByIdAndDelete(req.params.id);
    if (!event) {
      return res
        .status(404)
        .json({ message: "event not found!", success: false });
    }

    return res
      .status(200)
      .json({ message: "Event deleted successfully!", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error!", success: false });
  }
};

// update event by id
export const updateEvent = async (req, res) => {
  try {
    const event = await eventModel.findById(req.params.id);

    if (!event) {
      return res
        .status(404)
        .json({ message: "event not found!", success: false });
    }

    const { title, description, date, maxAttendees } = req.body;

    // if image come
    let image = {};

    if (req.file) {
      image = await uploadImage(req.file.path);
    }

    event.title = title || event.title;
    event.description = description || event.description;
    event.location = location || event.location;
    event.date = date || event.date;
    event.image = image.secure_url || event.image;
    event.maxAttendees = maxAttendees || event.maxAttendees;

    const updatedEvent = await event.save({ new: true });

    return res.status(200).json({
      message: "event updated successfully.",
      event: updatedEvent,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Internal server error!", success: false });
  }
};
