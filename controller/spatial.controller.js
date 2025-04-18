const mycon = require("../db");

const getPlotsData = async (req, res) => {
  // const query = "SELECT plots_attr.id, plots_attr.Plot_owner, plots_attr.gender, plots_attr.land_use, plots_attr.surveyor, plots_attr.ccp_number, plots_attr.date_registered, plots_attr.plot_number, block_number, ST_AsGeoJSON(`SPATIAL`) AS geometry FROM plots JOIN plots_attr ON plots.id=plots_attr.id;"
  const query =
    "SELECT id, plot_owner AS Plot_owner, gender, land_use, surveyor, ccp_number, date_registered, plot_number, block_number, ST_AsGeoJSON(spatial) AS geometry FROM plots;";
  mycon.query(query, (err, results, fields) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(400).json({ message: err.message, code: err.code });
    }
    console.log("Query Results:", results.rows);

    return res.status(200).json({ data: results.rows });
  });

  console.log("this is get spatial data");
};

const getBlocksData = async (req, res) => {
  // const query =
  //   "SELECT blocks_attr.id,  blocks_attr.name, blocks_attr.block_numb, ST_AsGeoJSON(`SPATIAL`) AS geometry FROM blocks JOIN blocks_attr ON blocks.id=blocks_attr.id;";
  const query =
    "SELECT id, name, block_numb, ST_AsGeoJSON(spatial) AS geometry FROM blocks;";
  mycon.query(query, (err, results, fields) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(400).json({ message: err.message, code: err.code });
    }
    console.log("Query Results:", results.rows);

    return res.status(200).json({ data: results.rows });
  });

  console.log("this is get spatial data");
};

const getBuildingsData = async (req, res) => {
  // const query =
  //   "SELECT buildings_attr.id,  buildings_attr.building_name, buildings_attr.owned_by, buildings_attr.heights, buildings_attr.purposes, buildings_attr.construction_year, ST_AsGeoJSON(`SPATIAL`) AS geometry FROM buildings JOIN buildings_attr ON buildings.id=buildings_attr.id;";
  const query = "SELECT id, ST_AsGeoJSON(spatial) AS geometry FROM buildings";
  mycon.query(query, (err, results, fields) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(400).json({ message: err.message, code: err.code });
    }
    console.log("Query Results:", results.rows);

    return res.status(200).json({ data: results.rows });
  });

  console.log("this is get spatial data");
};

const getPlotSearchResults = async (req, res) => {
  const { blockNumber, plotNumber } = req.query;
  console.log({ blockNumber, plotNumber });
  // const query = `SELECT * FROM plots AS p JOIN plots_attr AS pa ON p.id = pa.id WHERE pa.block_number = ? AND pa.plot_number = ?`;
  const query = `SELECT * FROM plots WHERE block_number = ? AND plot_number = ?`;

  mycon.query(query, [blockNumber, plotNumber], (err, results, fields) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(400).json({ message: err.message, code: err.code });
    }
    console.log("Query Results:", results);
    if (results.length === 0) {
      return res.status(404).json({ message: "Plot not found" });
    }
    return res.status(200).json({ data: results[0] });
  });
};

module.exports = {
  getPlotsData,
  getBlocksData,
  getBuildingsData,
  getPlotSearchResults,
};
