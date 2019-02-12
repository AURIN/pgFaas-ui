const apiMessageProcessing = (msg) => {
  if (typeof msg === 'string') {
    return msg;
  }
  return (msg.msg !== undefined) ? msg.msg : msg.message;
};

export {
  apiMessageProcessing
};

