const express = require('express');
const app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
const session = require('express-session')
var sharedSession = require("express-socket.io-session");
const cors = require("cors");
var mysql = require("mysql");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").load();
}
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
var multer = require('multer')
var bodyParser = require("body-parser");

app.use("/uploads",express.static('uploads'))

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true // enable set cookie
}));

let session_with_configuration = session({
  secret: process.env.SESS_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 60000 * 60 * 24 },
});

console.log(session_with_configuration)

app.use(session_with_configuration);

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});
connection.connect();

app.get('/session', function(req, res) {
  res.send(req.session)
});

app.get('/getUserInfos', function(req, res) {
  connection.query("SELECT * FROM users WHERE id=?", [req.session.myUserId], function (err, results) {
    if (!!err) {
      res.send(err);
    } else {
      res.send(results);
    }
  });
})

app.get('/users/:id', (req, res) => {
  connection.query("SELECT * FROM users WHERE id=?", [req.params.id], function (err, results) {
    if (!!err) {
      res.send(err);
    } else {
      res.send(results);
    }
  });
});

var transporterConfirmation = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "hellokaumea@gmail.com",
    pass: process.env.MAIL_PASSWORD
  }
});
var jwt = require("jsonwebtoken");
var salt = bcrypt.genSaltSync(Number(process.env.SALT));

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.post('/register', async (req, res) => {
  // console.log("REQ.SESSIONSTORE",req.sessionStore)
  //SESSION
  // connection.query(`SELECT * FROM sessions`, (err, results) => {
  // var results = JSON.parse(JSON.stringify(results))
  // results = JSON.parse(results[0].data)
  // console.log("session store userId on distant db ==>", results.userId)
  // })
  // console.log(email)
  const { firstname, lastname, username, email, password } = req.body
  const hashedPassword = await bcrypt.hash(password, salt);
  connection.query("SELECT * FROM users WHERE email=?", [email], function (
    err,
    rows,
    fields
  ) {
    console.log(`${err} ${rows}`)

    if (err) res.send(err);
    if (rows.length > 0) {
      res.send("Vous êtes déjà membre");
    } else {
      console.log("insert user")
      let sql2 = `INSERT INTO users (firstname, lastname, username, email, password, confirmed) VALUES ('${firstname}', '${lastname}', '${username}', '${email}', '${hashedPassword}', 0)`;
      sql2 = mysql.format(sql2);
      connection.query(sql2, (err, results) => {
        console.log("results registration", results);
        console.log("err registration", err);

        if (err) res.send(err);
        // req.session.userID = 42; //why does this ignit the registration of session in db?
        jwt.sign(
          {
            user: email
          },
          process.env.EMAIL_SECRET,
          {
            expiresIn: "1d"
          },
          (err, emailToken) => {
            console.log("email token", emailToken)
            const url = `http://localhost:4000/confirmation/${emailToken}`;

            transporterConfirmation.sendMail({
              to: email,
              subject: "Confirmation email",
              html: `Merci de cliquer ici pour confirmer votre adresse email : <a href="${url}">${url}</a>`
            }, (err, info) => {
              console.log("mail err", err);
              console.log("info.envelope", info.envelope);
              console.log("info.messageID", info.messageID);
            });
          }
        );
        res.sendStatus(200)
      });
    }
  });
})

app.get("/confirmation/:token", (req, res, next) => {
  try {
    // const { user: { email } } = jwt.verify(req.params.token, EMAIL_SECRET);
    const verify = jwt.verify(req.params.token, process.env.EMAIL_SECRET);
    const email = verify.user;
    //query pour mettre l'utilisateur avec cet email à confirmed = 1
    var post = { confirmed: 1 };
    var post2 = { email: email };
    connection.query("UPDATE users SET ? WHERE ?", [post, post2], function (
      err,
      rows,
      fields
    ) {
      if (!!err) {
        res.json(err);
        return;
      } else {
        console.log("member confirmed");
      }
    });
  } catch (e) {
    res.send("error");
  }
  return res.redirect("http://localhost:3000/");
});

app.post("/login", (req, res, next) => {
  const { email, password } = req.body
  // console.log(`${parent} ${Object.keys(context)} ${Object.keys(info)}`)
  // console.log("REQ.SESSIONID on local server ==>", req.sessionID);
  connection.query("SELECT * FROM users WHERE email=?", [email], (err, results) => {
    if (err) res.send(err);
    if (results.length < 1) {
      res.send(results);
      return;
    }
    let hash = results[0].password;
    req.session.myUserId = results[0].id;
    req.session.myUsername = results[0].username;
    // console.log("session set", req.session)
    bcrypt.compare(password, hash, function (err, response) {
      if (err) {
        res.send(err);
      } else {
        if (!response) res.send([]);
        else res.send(results);
      }
    });
  });
})

app.get('/users', (req, res) => {
  let session;
  let i=0;
  for(let prop in req.sessionStore.sessions){
    session = JSON.parse(req.sessionStore.sessions[prop]).myUserId
    console.log(i++, req.session)
  }
  connection.query("SELECT users.id, users.email, users.username, users.age, users.town, user_photos.image_path, user_photos.active FROM users LEFT JOIN user_photos ON users.id = user_photos.user_id AND user_photos.active = 1 WHERE users.id != ?", [req.session.myUserId], function(err, results){
      if (!!err) {
        res.send(err)
      };
      res.send(results);
  });
});


var transporterForgotPwd = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "hellokaumea@gmail.com",
    pass: process.env.MAIL_PASSWORD
  }
});
app.post('/forgotPwd', (req, res) => {
  const { email } = req.body
  connection.query(
    "SELECT * FROM users WHERE email=?",
    [email],
    (err, results) => {
      if (err) {
        console.log("ERR", err)
      }
      else {
        if (results.length > 0) {
          jwt.sign(
            {
              user: email
            },
            process.env.EMAIL_SECRET2,
            {
              expiresIn: "1d"
            },
            (err, emailToken) => {
              if (!!err) res.send(err)
              transporterForgotPwd.sendMail({
                to: email,
                subject: "Réinitialisation mot de passe",
                html: `<p>Veuillez cliquer <a href="http://localhost:3000/resetPassword/${emailToken}">ici</a> pour réinitialiser votre mot de passe.</p>`
              });
            }
          );
        }
        res.send(results);
      }
    }
  );
})


// app.get('/resetPassword/:token', async (req, res) => {
//   const { token } = req.params
//   res.send(token);
// })

app.post('/resetPassword', async (req, res) => {
  const { resetPassword, token } = req.body
  const hashedPassword = await bcrypt.hash(resetPassword, salt);
  const verify = jwt.verify(token, process.env.EMAIL_SECRET2);
  const email = verify.user;
  var post = { password: hashedPassword };
  var post2 = { email };
  connection.query("UPDATE users SET ? WHERE ?", [post, post2], function (err) {
    if (!!err) {
      res.send(err);
    } else {
      res.send("password changed");
    }
  });
})


app.get('/getMemberProfileInfos/:id', (req, res) => {
  const { id } = req.params
  // let sql = `SELECT
  // users.id,
  // users.email,
  // users.username,
  // users.age,
  // users.town,
  // user_photos.image_path
  // FROM users
  // INNER JOIN user_photos
  // ON users.id =
  // user_photos.user_id
  // WHERE user_photos.active = 1
  // `;

  // sql = mysql.format(sql);
  connection.query(
    // `SELECT
    //   users.username,
    //   users.age,
    //   users.town,
    //   users.biography,
    //   user_popularity_score.score,
    //   user_photos.image_path
    //   FROM users
    //   INNER JOIN user_photos ON users.id = user_photos.user_id
    //   INNER JOIN user_popularity_score ON users.id = user_popularity_score.user_id
    //   WHERE users.id = ?`
    `SELECT users.username, 
        users.age, 
        users.town, 
        users.biography 
        FROM users 
        WHERE users.id = ?`,
    [id],
    (err, results) => {
      if (err) res.send(err);
      if (!results) res.send("this member doesn't exist");
      else res.send(results);
    }
  );
})

app.post('/modifyUsername', (req, res) => {
  const username = Object.keys(req.body)[0]
  var post = { username: username };
  var post2 = { id: req.session.myUserId };
  connection.query("UPDATE users SET ? WHERE ?", [post, post2], function (err) {
    if (!!err) {
      res.send(err);
    } else {
      res.send("username updated")
    }
  });
})

app.post('/modifyTown', (req, res) => {
  const town = Object.keys(req.body)[0]
  var post = { town: town };
  var post2 = { id: req.session.myUserId };
  connection.query("UPDATE users SET ? WHERE ?", [post, post2], function (err) {
    if (!!err) {
      res.send(err);
    } else {
      res.send("town updated")
    }
  });
})

app.post('/modifyGender', (req, res) => {
  const gender = Object.keys(req.body)[0]
  var post = { gender: gender };
  var post2 = { id: req.session.myUserId };
  connection.query("UPDATE users SET ? WHERE ?", [post, post2], function (err) {
    if (!!err) {
      res.send(err);
    } else {
      res.send("gender updated")
    }
  });
})

app.post('/modifyEmail', (req, res) => {
  const email = Object.keys(req.body)[0]
  var post = { email: email };
  var post2 = { id: req.session.myUserId };
  connection.query("UPDATE users SET ? WHERE ?", [post, post2], function (err) {
    if (!!err) {
      res.send(err);
    } else {
      res.send("email updated")
    }
  });
})

app.post('/modifyFirstname', (req, res) => {
  const firstname = Object.keys(req.body)[0]
  var post = { firstname: firstname };
  var post2 = { id: req.session.myUserId };
  connection.query("UPDATE users SET ? WHERE ?", [post, post2], function (err) {
    if (!!err) {
      res.send(err);
    } else {
      res.send("firstname updated")
    }
  });
})

app.post('/modifyLastname', (req, res) => {
  const lastname = Object.keys(req.body)[0]
  var post = { lastname: lastname };
  var post2 = { id: req.session.myUserId };
  connection.query("UPDATE users SET ? WHERE ?", [post, post2], function (err) {
    if (!!err) {
      res.send(err);
    } else {
      res.send("lastname updated")
    }
  });
})

app.post('/modifySexualOrientation', (req, res) => {
  const sexualOrientation = Object.keys(req.body)[0]
  var post = { lookingFor: sexualOrientation };
  var post2 = { id: req.session.myUserId };
  connection.query("UPDATE users SET ? WHERE ?", [post, post2], function (err) {
    if (!!err) {
      res.send(err);
    } else {
      res.send("sexualOrientation updated")
    }
  });
})

app.post('/modifyBirthdate', (req, res) => {
  const birthdate = Object.keys(req.body)[0]
  var post = { age: birthdate };
  var post2 = { id: req.session.myUserId };
  connection.query("UPDATE users SET ? WHERE ?", [post, post2], function (err) {
    if (!!err) {
      res.send(err);
    } else {
      res.send("birthdate updated")
    }
  });
})

app.post('/modifyPassword', async (req, res) => {
  console.log('test')
  const password = Object.keys(req.body)[0]
  const hashedPassword = await bcrypt.hash(password, salt);
  var post = { password: hashedPassword };
  var post2 = { id: req.session.myUserId };
  connection.query("UPDATE users SET ? WHERE ?", [post, post2], function (err) {
    if (!!err) {
      res.send(err);
    } else {
      res.send("password changed");
    }
  });
})

app.post('/modifyDescription', (req, res) => {
  const biography = Object.keys(req.body)[0]
  var post = { biography: biography };
  var post2 = { id: req.session.myUserId };
  connection.query("UPDATE users SET ? WHERE ?", [post, post2], function (err) {
    if (!!err) {
      res.send(err);
    } else {
      res.send("description updated")
    }
  });
})

app.post('/modifyTags', (req, res) => {
  let tags = req.body
  var post = { tags: JSON.stringify(tags) };
  var post2 = { id: req.session.myUserId };
  connection.query("UPDATE users SET ? WHERE ?", [post, post2], function (err) {
    if (!!err) {
      res.send(err);
    } else {
      res.send("tags updated")
    }
  });
})


// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + '.jpg')
  }
})

var upload = multer({ storage: storage })

app.post('/uploadPhoto', upload.single('myImage'), (req, res, next) => {
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
  let query = `INSERT INTO user_photos (user_id, image_path, active, date_created) VALUES ('${req.session.myUserId}', '${req.file.path}', '${0}', '${new Date().toISOString().slice(0, 19).replace('T', ' ')}')`;
  query = mysql.format(query);
  connection.query(query, (err, results) => {
    if (!!err) {
      res.send(err);
    } else {
      res.send(file)
    }
  });
})

app.post('/setAsPP', (req, res) => {
  let image_path = Object.keys(req.body)[0]
  var post = { active: 1 };
  var post2 = { image_path: image_path };
  connection.query("UPDATE user_photos SET ? WHERE ?", [post, post2], function (err) {
    if (!!err) {
      res.send(err);
    } else {
      res.send("PP updated")
    }
  });
})

app.post('/removePhoto', (req, res) => {
  const path = Object.keys(req.body)[0]
  console.log("path", path)
  var post = { image_path: path };
  var post2 = { user_id: req.session.myUserId };
  connection.query("DELETE FROM user_photos WHERE ? AND ?", [post, post2], function (err) {
    if (!!err) {
      res.send(err);
    } else {
      res.send("image removed")
    }
  });
})

app.get('/getPhotosPaths', (req, res) => {
  connection.query("SELECT image_path FROM user_photos WHERE user_id=?", [req.session.myUserId], function (err, results) {
    if (!!err) {
      res.send(err);
    } else {
      // console.log(results[0].image_path)
      res.send(results);
    }
  });
})


app.post('/getChatBetween2', (req, res) => { 
  console.log("REQ====", req.body)
  // const chat_match_username = Object.keys(req.body)[0]
  // connection.query("SELECT id FROM users WHERE username=?", [chat_match_username], function (err, results) {
  //   if (!!err) {
  //     res.send("could not get id from username", err);
  //   } else {
  //     if(!results[0]) {
  //       res.send("could not get username");
  //       return;
  //     }
      // let chat_match_id = results[0].id;
      let chat_match_id = Object.keys(req.body)[0]
      connection.query("SELECT * FROM user_chat_conversations WHERE user_id=? AND chat_match_id=? OR chat_match_id=? AND user_id=? ORDER BY conversation_id ", [req.session.myUserId, chat_match_id, req.session.myUserId, chat_match_id], function (err, results) {
        if (!!err) {
          res.send(err);
        } else {
          results.forEach(x => {x.date = x.date.slice(0, 19).replace('T', ' ');})
          res.send(results);
        }
      })
    }
  // }
  );
// })

app.get('/getAllConversationsWithMe', (req, res) => { 
  console.log("REQ====2", req.body)

  connection.query(`SELECT u1.username as fromUsername, u2.username as toUsername, user_chat_conversations.message, user_chat_conversations.date 
                    FROM users AS u1 JOIN users AS u2 JOIN user_chat_conversations 
                    ON (u1.id = user_chat_conversations.user_id) AND (u2.id = user_chat_conversations.chat_match_id) 
                    WHERE user_id=? OR chat_match_id=?
                    ORDER BY user_chat_conversations.conversation_id`, [req.session.myUserId, req.session.myUserId], 
  function (err, results) {
        if (!!err) {
          res.send(err);
        } else {
          // results.forEach(({date}) => console.log(date))
          res.send(results.map(
            ({message, date, fromUsername, toUsername}) =>
            ({message, date, fromUsername, toUsername})
            ));
        }
      })
    }
)

var port = process.env.PORT || 4000;

io.set('origins', 'http://localhost:3000');
io.use(sharedSession(session_with_configuration)); 

const socket_ids = {};

io.on('connection', function (client) {
  let userid = client.handshake.session.myUserId;
  let username = client.handshake.session.myUsername;
  socket_ids[username] = client.id;
  console.log(`SOCKET[userid=${userid}, socket_id:${client.id}]: new connection`);

  // receiving message and recipient's username from client
  client.on('chat message', function({to, message}){
    console.log(`SOCKET[userid=${userid}, socket_id:${client.id}]: sent ${message} to ${to} (socket_id=${socket_ids[to]})`);
    let date = new Date().toISOString();

    // get recipient's id from database
    connection.query("SELECT id FROM users WHERE username=?", [to], function (err, results) {
      if (!!err) {
        console.log(`SOCKET: error: could not get id from username ${to}`);
      } else {
        let recipient_id = results[0].id;
        console.log(`SOCKET: got recipient id from data base: ${recipient_id}`);
        let query = "INSERT INTO matcha.user_chat_conversations (user_id, chat_match_id,  message, date) VALUES (?, ?, ?, ?)";
        query = mysql.format(query);
        connection.query(query, [userid, recipient_id, message, date], (err) => {
          if (!!err) {
            console.log("SOCKET error: could not store message in database", err)
          } else {
            console.log("SOCKET: stored message in database", username, to, message, date)
            let msg = {fromUsername:username, toUsername:to, message, date};
            io.to(client.id).emit('chat message', msg);
            if(socket_ids[to] !== undefined) {
              io.to(socket_ids[to]).emit('chat message', msg);
            }
          }
        })
      }
    });
  });
  // client.on('register', handleRegister)

  // client.on('join', handleJoin)

  // client.on('leave', handleLeave)

  // client.on('message', handleMessage)

  // client.on('chatrooms', handleGetChatrooms)

  // client.on('availableUsers', handleGetAvailableUsers)

  client.on('disconnect', function () {
    console.log('client disconnect...', client.id)
    // handleDisconnect()
  })

  client.on('error', function (err) {
    console.log('received error from client:', client.id)
    console.log(err)
  })
})

http.listen(port, function () {
  console.log('App listening on port ' + port + '!');
});
      // app.use((req, res, next) => {
      //   res.status(200).json({
      //     message: 'it works'
      //   })
      // })