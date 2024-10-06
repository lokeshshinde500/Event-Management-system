import { Router } from "express";
import {
  create,
  deleteEvent,
  getAllEvents,
  getEvent,
  getEventsOfUser,
  updateEvent,
} from "../controllers/eventController.js";
import { upload } from "../models/eventModel.js";
const routes = Router();

// create event
routes.post("/", upload, create);

// get events of user
routes.get("/", getEventsOfUser);

// get all events and filter based on title/description/date/location
routes.get("/allEvents", getAllEvents);

// get single event by id
routes.get("/:id", getEvent);

// update event
routes.patch("/:id",upload, updateEvent);

// delete event
routes.delete("/:id", deleteEvent);

export default routes;
