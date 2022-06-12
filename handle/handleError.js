function handleError(res, err) {
  let message = '';
  if (err) {
    message = err.message;
  } else {
    message = '欄位未填寫正確或無此id';
  }
  res.status(400).json({
    message,
  });
}

module.exports = handleError;
