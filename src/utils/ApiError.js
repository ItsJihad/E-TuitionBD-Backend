class ApiError extends Error {
  constructor(statusCode, message = "THE-API-ERROR", errors = [], stack = "") {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.stack = stack;
    this.data = null;
    this.success = false;
    this.message = message;

    if(stack){
        this.stack=stack
    }else{
        Error.captureStackTrace(this,this.constructor)
    }

  }
}
export {ApiError}


// here we just structured how our API ERRORS gonna show up in the frontend