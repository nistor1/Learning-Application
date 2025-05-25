const isAdmin = (req, res, next) => {
    if (req.session && req.session.user && req.session.user.admin === true) {
        next();
    } else {
        res.status(403).json({ message: 'Access denied - only admins can access this endpoint' });
    }
};

module.exports = isAdmin;
