const passport = require('passport');

const router = require('express').Router();

router.use('/', require('./swagger'));

router.use('/applications', require('./jobApplications'));

router.use('/recruiters', require('./recruiters'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) return next(err);

    req.session.destroy((err) => {
      if (err) return next(err);
      res.clearCookie('connect.sid');
      res.redirect('/');
    });
  });
});

module.exports = router;
