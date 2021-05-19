DROP TABLE IF EXISTS helo_users;
DROP TABLE IF EXISTS helo_posts;

CREATE TABLE IF NOT EXISTS helo_users (id SERIAL PRIMARY KEY, username VARCHAR(40) NOT NULL, password VARCHAR(100) NOT NULL, profile_pic TEXT);
CREATE TABLE IF NOT EXISTS helo_posts (id SERIAL PRIMARY KEY, title VARCHAR(45) NOT NULL, content TEXT, img TEXT, author_id INTEGER, date_created TIMESTAMP);




INSERT INTO helo_posts (author_id, title, img, content, date_created)
VALUES (1, 'herp', 'img', 'content', '2016-06-22 19:10:25-07');

INSERT INTO helo_posts (author_id, title, img, content, date_created)
VALUES (2, 'another post', 'img', 'content', '2016-06-22 19:10:25-07');

INSERT INTO helo_posts (author_id, title, img, content, date_created)
VALUES (1, 'a third post', 'img', 'content', '2016-06-22 19:10:25-07');