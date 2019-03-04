const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));

router.get('/random/:min/:max', (req, res) => {
  let min = req.params.min;
  let max = req.params.max;
  console.log(min, max);
  
  if (Number.isNaN(min) || Number.isNaN(max)) {
    res.status(400);
    res.json({error: 'Bad Request.'});
    return;
  }
  let result = Math.round((Math.random() * (max - min) + min));
  res.json({ result: result});
});

module.exports = router;
