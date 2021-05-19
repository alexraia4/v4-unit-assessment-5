const bcrypt = require('bcryptjs');

module.exports = {

    register: async (req, res) => {
        let {username, password} = req.body;
        const db = req.app.get('db');

        let result = await db.user.find_user_by_username([username]);
        let existingUser = result[0];
        if (existingUser) {
            return res.status(409).send('Username taken');
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const registeredUser = await db.user.create_user([username, hash, `https://robohash.org/${username}.png`]);
        const user = registeredUser[0];
        req.session.user = {id:user.id, username: user.username, profile_pic: user.profile_pic};
        return res.status(201).send(req.session.user);
    },

    login: async (req, res) => {
        let {username, password} = req.body;
        const db = req.app.get('db');
        
        
        let result = await db.user.find_user_by_username([username]);
        let user = result[0];
        if (!user) {
            return res.status(409).send('wrong username or password bro');
        }

        
        const isAuthenticated = bcrypt.compareSync(password, user.password);
        if (!isAuthenticated) {
          return res.status(403).send('wrong password bro');
        }

        req.session.user = {id: user.id, username: user.username, profile_pic: user.profile_pic};
        return res.status(201).send(req.session.user);
    },

    getUser: async (req, res) => {
       
        if(req.session.user){
            return res.status(201).send(req.session.user);
        }
        else {
            return res.status(403).send('Login required');
        }
        
    },

    logout: async (req, res) => {
        req.session.destroy();
        return res.sendStatus(200);
    }
}