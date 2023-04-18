const express = require('express');
const router = express.Router();
const db = require('../db/database');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const { query } = req.query;

  if (query) {
    try {
      const result = await db.query(`
        SELECT *
        FROM users
        WHERE search_vector @@ plainto_tsquery($1);
      `, [query]);

      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while searching users' });
    }
  } else {
    try {
      const result = await db.query('SELECT * FROM users');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching users' });
    }
  }
});


module.exports = router;
