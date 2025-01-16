const StatusCode = {
    // Success Codes
    SUCCESS: 200,              // Request succeeded
    CREATED: 201,              // Resource successfully created
    ACCEPTED: 202,             // Request accepted, processing pending
    NO_CONTENT: 204,           // Request succeeded, no content returned

    // Client Error Codes
    BAD_REQUEST: 400,          // Invalid request parameters
    UNAUTHORIZED: 401,         // Authentication required or failed
    FORBIDDEN: 403,            // Access denied to the resource
    NOT_FOUND: 404,            // Resource not found
    CONFLICT: 409,             // Request conflict with current state
    UNPROCESSABLE_ENTITY: 422, // Validation error or invalid data

    // Server Error Codes
    INTERNAL_SERVER_ERROR: 500, // Generic server error
    NOT_IMPLEMENTED: 501,       // Functionality not implemented
    SERVICE_UNAVAILABLE: 503,   // Service temporarily unavailable
};

module.exports = {StatusCode};