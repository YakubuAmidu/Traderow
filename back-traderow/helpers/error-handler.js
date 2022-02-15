
function errorhandler(err, req, res, next){
    if(err.name === 'UnauthorizedError'){
        // JWT authentication error
        return res.status(401).json({ message: 'The user is not authorized...✋' });
    } else if(err.name === 'ValidationError'){
        // Validation error
        return res.status(401).json({ message: err });
    } else {
        // Default to 500 server error
        return res.status(500).json(err);
    }
}

module.exports = errorhandler;

