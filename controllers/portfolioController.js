const Profile = require('../models/Profile');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const EditWork = require('../models/EditWork');
const asyncHandler = require('../middleware/asyncHandler');

exports.getProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne().lean();
  if (!profile) return res.status(404).json({ success: false, message: 'Profile not found. Run: npm run seed' });
  res.json({ success: true, data: profile });
});

exports.getProjects = asyncHandler(async (req, res) => {
  const filter = req.query.featured === 'true' ? { featured: true } : {};
  const projects = await Project.find(filter).sort({ order: 1 }).lean();
  res.json({ success: true, count: projects.length, data: projects });
});

exports.getSkills = asyncHandler(async (req, res) => {
  const skills = await Skill.find().sort({ order: 1 }).lean();
  res.json({ success: true, count: skills.length, data: skills });
});

exports.getEdits = asyncHandler(async (req, res) => {
  const edits = await EditWork.find().sort({ order: 1 }).lean();
  res.json({ success: true, count: edits.length, data: edits });
});
