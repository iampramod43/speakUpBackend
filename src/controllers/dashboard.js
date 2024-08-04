const issueService = require('../services/issues');
// Helper function to format date to month-year
const formatDateToMonth = (date) => {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return monthNames[date - 1];
};

// 1. Line Chart - Number of issues vs month
const lineChart = async (req, res) => {
  try {
    const issues = await issueService.aggregate([
      { $group: { _id: { $month: "$created_at" }, count: { $sum: 1 } } },
      { $sort: { "_id": 1 } }
    ]);

    console.log("🚀 ~ file: dashboard.js:19 ~ lineChart ~ issues:", issues);

    const chartData = issues.map(issue => ({
      month: formatDateToMonth(issue._id),
      count: issue.count
    }));
    res.json(chartData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Bar Chart - Number of issues vs month
const barChart = async (req, res) => {
  try {
    const issues = await issueService.aggregate([
      { $group: { _id: { $month: "$created_at" }, count: { $sum: 1 } } },
      { $sort: { "_id": 1 } }
    ]);
    const chartData = issues.map(issue => ({
      month: formatDateToMonth(issue._id),
      count: issue.count
    }));
    res.json(chartData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Pie Chart - Issues with categories
const pieChart = async (req, res) => {
  try {
    const issues = await issueService.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    const chartData = issues.map(issue => ({
      category: issue._id,
      count: issue.count,
    }));
    res.json(chartData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. Area Chart Stacked - Number of issues in each category vs month
const areaChart = async (req, res) => {
  try {
    const issues = await issueService.aggregate([
      { $group: { _id: { month: { $month: "$created_at" }, category: "$category" }, count: { $sum: 1 } } },
      { $sort: { "_id.month": 1, "_id.category": 1 } }
    ]);
    const categories = await issueService.distinct('category');
    const chartData = [];

    issues.forEach(issue => {
      const month = formatDateToMonth(issue._id.month);
      let monthData = chartData.find(data => data.month === month);
      if (!monthData) {
        monthData = { month };
        categories.forEach(category => monthData[category] = 0);
        chartData.push(monthData);
      }
      monthData[issue._id.category] = issue.count;
    });

    res.json(chartData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 5. Radar Chart - Total issues last 6 months
const radarChart = async (req, res) => {
  try {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    const issues = await issueService.aggregate([
      { $match: { created_at: { $gte: sixMonthsAgo } } },
      { $group: { _id: { $month: "$created_at" }, count: { $sum: 1 } } },
      { $sort: { "_id": 1 } }
    ]);
    const chartData = issues.map(issue => ({
      month: formatDateToMonth(issue._id),
      count: issue.count
    }));
    res.json(chartData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 6. Radial Chart - Total number of issues last 6 months
const radialChart = async (req, res) => {
  try {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    const issues = await issueService.aggregate([
      { $match: { created_at: { $gte: sixMonthsAgo } } },
      { $group: { _id: null, count: { $sum: 1 } } }
    ]);
    const chartData = {
      count: issues.length > 0 ? issues[0].count : 0,
    };
    res.json(chartData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    lineChart,
    barChart,
    pieChart,
    areaChart,
    radarChart,
    radialChart,
  
};
