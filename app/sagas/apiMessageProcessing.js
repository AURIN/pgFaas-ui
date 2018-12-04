const apiMessageProcessing = (msg) => {
  return (msg.msg !== undefined) ? msg.msg : msg.message;
};

export {
  apiMessageProcessing
};

