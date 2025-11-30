const router = require('express').Router();

router.post('/', (req, res) => {
    const { email, password } = req.body;
    if (email === 'admin@example.com' && password === 'Admin123') {
        res.status(200).json({ token: 'dummy-token-123', isAdmin: true });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

module.exports = router;
