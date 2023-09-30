import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log(req.cookies);

  let name = "Unknown";
  if (req.cookies['fullName']) {
    name = req.cookies['fullName'];
  }

  res.send(`Hello Mr/Ms: ${name}`);
});

export default router;
