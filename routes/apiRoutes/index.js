const express = require('express');
const router = express.Router();
router.use(require('./departmentsRoute'));
router.use(require('./employeesRoute'));
router.use(require('./rolesRoute'));

module.exports = router;
