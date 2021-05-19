module.exports = {
    readPosts: async (req, res) => {
      let { id } = req.session.user;
      let { mine, search, oldest } = req.query;
      const db = await req.app.get('db');
      
      
      if (mine && !search) {
        if (oldest) {
          db.post.read_all_oldest_first()
            .then(posts => res.status(200).send(posts))
        } else {
          db.post.read_all_posts()
            .then(posts => res.status(200).send(posts))
        }
      } else if (!mine && search) {
        if (oldest) {
          db.search.search_other_oldest_first([`%${search.toLowerCase()}%`, id])
            .then(posts => res.status(200).send(posts))
        } else {
          db.search.search_other_users_posts([`%${search.toLowerCase()}%`, id])
            .then(posts => res.status(200).send(posts))
        }
      } else if (mine && search) {
        if (oldest) {
          db.search.search_all_oldest_first([`%${search.toLowerCase()}%`])
            .then(posts => res.status(200).send(posts))
        } else {
          db.search.search_all_posts([`%${search.toLowerCase()}%`])
            .then(posts => res.status(200).send(posts))
        }
      } else {
        if (oldest) {
          db.post.read_other_oldest_first([id])
            .then(posts => res.status(200).send(posts))
        } else {
          db.post.read_other_users_posts([id])
            .then(posts => res.status(200).send(posts))
        }
      } 
      
    },
    createPost: async(req, res) => {



      if(!req.session.user){
        return res.status(403).send('Login required');
      }
      
      const db = await req.app.get('db');

      
      const result = await db.post.create_post(req.session.user.id, req.body.title, req.body.img, req.body.content);
      
      return res.status(201).send('post created');

    },
    readPost: (req, res) => {
      req.app.get('db').post.read_post(req.params.id)
        .then(post => post[0] ? res.status(200).send(post[0]) : res.status(200).send({}))
    },
    deletePost: (req, res) => {
      req.app.get('db').post.delete_post(req.params.id)
        .then(_ => res.sendStatus(200))
    }
  }