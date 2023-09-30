import express from 'express';

const router = express.Router();

const calc = (value: number) => {
  for (let i = 0; i < 5; i++) {
    value = value + i + (i * i);
  }
  return value;
}

/* GET home page. */
router.get('/', (req, res, next) => {
  console.log(req.cookies);

  const res1 = Number(req.query.x) + 10;
  const res2 = res1 / 3.5;
  const res3 = res2 * 7.5;
  const res4 = calc(res3);

  let name = "Unknown";
  if (req.cookies['fullName']) {
    name = req.cookies['fullName'];
  }

  res.send(`Hello Mr/Ms: ${name}, res:${res4}`);
});

export default router;
