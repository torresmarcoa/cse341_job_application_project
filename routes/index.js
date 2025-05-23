const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
  //#swagger.tags=['Welcome Message']
  res.send('Welcome to JobApplication API');
});

router.use('/applications', require('./jobApplications'));

router.use('/recruiters', require('./recruiters'));

module.exports = router;
