module.exports = {
    isLoggedIn(req, res, next) {
        const token = req.headers.authorization;

        if (token) {
            jwt.verify(token, jwtSecret, (err, decodedToken) => {
                if (err) {
                    res.status(401).json({ code: 401, message: 'Token invalid' });
                } else {
                    User.findById(decodedToken.id)
                        .then(user => {
                            if (!user) {
                                res.status(401).json({ code: 401, message: 'User not found' });
                            } else {
                                req.user = user;
                                next();
                            }
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({ code: 500, message: 'DB error while fetching user', err });
                        });
                }
            });
        } else {
            res.status(401).json({ code: 401, message: 'Token not provided' });
        }
    }
}