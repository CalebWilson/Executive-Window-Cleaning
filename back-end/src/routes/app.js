//function to access database
const access_database = require ("./access_database");

const express = require ("express");
const router = express.Router();

//root
router.get ("/", (request, response) =>
{
	response.redirect ("/schedule/0");
});

//schedule
const schedule_router = require ("./schedule");
router.use ("/schedule", schedule_router);

//scheduled job
const scheduled_job_router = require ("./scheduled_job");
router.use ("/scheduled_job", scheduled_job_router);

//generate
const generate_router = require ("./generate");
router.use ("/generate", generate_router)

//workers
const get_workers = require ("../db/workers");
router.get ("/workers", access_database (get_workers));

//jobs
const get_jobs = require ("../db/jobs");
router.get ("/jobs", access_database (get_jobs));

module.exports = router;
