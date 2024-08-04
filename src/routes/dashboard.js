const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard');

router.get('/chart/line', dashboardController.lineChart)
router.get('/chart/bar', dashboardController.barChart)
router.get('/chart/pie', dashboardController.pieChart)
router.get('/chart/area', dashboardController.areaChart)
router.get('/chart/radar', dashboardController.radarChart)
router.get('/chart/radial', dashboardController.radialChart)


module.exports = router;
