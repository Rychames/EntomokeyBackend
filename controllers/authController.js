const db = require('../config/db');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('849586959948-s1dfl9tu6ujnujrvjln8o5osalmhqpsr.apps.googleusercontent.com');

exports.googleAuth = async (req, res) => {
    const { token } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: '849586959948-s1dfl9tu6ujnujrvjln8o5osalmhqpsr.apps.googleusercontent.com',
        });
        const { sub: googleId, email, name, picture: profilePicture } = ticket.getPayload();

        // Verificar se o usuário já existe no banco de dados
        db.query('SELECT * FROM users WHERE google_id = ?', [googleId], (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao buscar usuário' });
            }

            if (results.length > 0) {
                // Usuário já existe
                return res.json({ isNewUser: false, user: results[0] });
            } else {
                // Criar um novo usuário
                const sql = 'INSERT INTO users (google_id, email, name, profile_picture, user_type, created_at) VALUES (?, ?, ?, ?, ?, NOW())';
                const userType = 'common'; // ou 'staff' dependendo do seu critério
                db.query(sql, [googleId, email, name, profilePicture, userType], (err, result) => {
                    if (err) {
                        return res.status(500).json({ error: 'Erro ao criar usuário' });
                    }
                    res.json({ isNewUser: true, user: { id: result.insertId, google_id: googleId, email, name, profile_picture: profilePicture, user_type: userType } });
                });
            }
        });
    } catch (error) {
        res.status(400).json({ error: 'Token inválido' });
    }
};
