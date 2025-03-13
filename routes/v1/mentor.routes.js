const express=require('express');
const mentorController=require('../../controllers/mentor.controller');
const asyncHandler=require('../../helper/asyncHandler');

const router=express.Router();

router.get('/', asyncHandler(mentorController.getAllMentors))
router.get('/:username', asyncHandler(mentorController.getMentorinfoByUsername))

module.exports=router;