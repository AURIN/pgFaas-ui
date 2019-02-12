class ApiError {
  constructor ({ msg, status }) {
    this.msg = msg;
    this.status = status;
  }
}

class ApiResponse {
  constructor (response) {
    this.response = response;
  }
}

export { ApiError, ApiResponse };
