const jwt = require('jsonwebtoken');

// Middleware to verify the JWT token
const authenticateToken = (req, res, next) => {
    // Retrieve the token from the headers
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

    // If no token is found, return an unauthorized response
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Token missing. Please authenticate.',
        });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        // If the token is invalid or expired, return a forbidden response
        if (err) {
            return res.status(403).json({
                success: false,
                message: 'Invalid or expired token.',
            });
        }

        // If the token is valid, add the user data to the request object
        req.user = user;
        next();  // Proceed to the next middleware or route handler
    });
};

// Function to generate a JWT token
function generateToken(user) {
    const token = jwt.sign({ id: user.id, nom: user.nom }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    return token;
}

module.exports = authenticateToken;
