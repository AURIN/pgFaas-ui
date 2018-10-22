/**
 * Test controller
 * @param {Request} req Request
 * @param {Response} res Response
 */
function test (req, res) {
  res.status(200).send({msg: 'test message'});
}

module.exports = test;
