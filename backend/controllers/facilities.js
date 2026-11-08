const Booking = require("../models/Booking");
const Facility = require("../models/Facility");

const parseDay = (value) => {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const day = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(day.getTime()) && day.toISOString().startsWith(value) ? day : null;
};

exports.getFacilities = async (req, res, next) => {
  try {
    const facilities = await Facility.find({ isActive: true }).sort({ name: 1 });
    res.status(200).json({ success: true, count: facilities.length, data: facilities });
  } catch (error) {
    next(error);
  }
};

exports.getFacility = async (req, res, next) => {
  try {
    const facility = await Facility.findOne({ _id: req.params.id, isActive: true });
    if (!facility) return res.status(404).json({ success: false, error: "Facility not found" });
    res.status(200).json({ success: true, data: facility });
  } catch (error) {
    next(error);
  }
};

exports.getFacilityAvailability = async (req, res, next) => {
  try {
    const day = parseDay(req.query.date);
    if (!day) return res.status(400).json({ success: false, error: "date in YYYY-MM-DD format is required" });

    const facility = await Facility.findOne({ _id: req.params.id, isActive: true });
    if (!facility) return res.status(404).json({ success: false, error: "Facility not found" });

    // Public endpoint: only the time ranges are returned, never who booked them.
    const booked = await Booking.find({ facility: facility.id, bookingDate: day })
      .select("startMinutes endMinutes")
      .sort({ startMinutes: 1 })
      .lean();
    res.status(200).json({ success: true, data: { date: req.query.date, booked } });
  } catch (error) {
    next(error);
  }
};

exports.createFacility = async (req, res, next) => {
  try {
    const facility = await Facility.create(req.body);
    res.status(201).json({ success: true, data: facility });
  } catch (error) {
    next(error);
  }
};

exports.updateFacility = async (req, res, next) => {
  try {
    const facility = await Facility.findOneAndUpdate(
      { _id: req.params.id, isActive: true },
      req.body,
      { new: true, runValidators: true }
    );
    if (!facility) return res.status(404).json({ success: false, error: "Facility not found" });
    res.status(200).json({ success: true, data: facility });
  } catch (error) {
    next(error);
  }
};

exports.deleteFacility = async (req, res, next) => {
  try {
    const facility = await Facility.findOneAndUpdate(
      { _id: req.params.id, isActive: true },
      { isActive: false },
      { new: true }
    );
    if (!facility) return res.status(404).json({ success: false, error: "Facility not found" });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
