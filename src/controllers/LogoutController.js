class LogoutController {
    logout = async (req, res) => {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/' 
        });

        return res.status(200).json({ message: 'Logout exitoso' });
    };
};

module.exports = LogoutController;