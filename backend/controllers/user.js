import fs from 'fs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mysql from 'mysql';
import User from '../models/user.js';
import Comment from '../models/comment.js';
import Reply from '../models/reply.js';
import { Sequelize } from 'sequelize';
import script from '../js/script.mjs';
import { request } from 'express';


// create a connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'otakuJj9672$',
  database: 'Groupon-Full-Stack'
});

/* FUNCTION TO SIGNUP AND LOGIN A USER! */
export const signup = async (req, res, next) => {
  const value = script.checkPassword(req.body.password);
  let user;
  if (value.conditional === true) {
    try {
      const hash = await bcrypt.hash(req.body.password, 10);
      try {
        // query the database to find if the user exists
        pool.query('SELECT * FROM users WHERE email = ?', [req.body.email], (err, results) => {
          if (err) {
            return res.status(402).send({ message: 'Something went wrong!' });
          }
          if (results.length === 0) {
            // create a new user
            const user = {
              email: req.body.email,
              lastname: req.body.lastname,
              firstname: req.body.firstname,
              phonenumber: req.body.phonenumber,
              password: hash
            };
            pool.query('INSERT INTO Users SET ?', user, (err, results) => {
              if (err) {
                res.status(500).send({ message: err });
              }
              const token = jwt.sign(
                { userId: results.insertId },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24H' }
              );
              res.status(201).send({
                email: user.email,
                userId: results.insertId,
                token: token,
                firstname: user.firstname,
                lastname: user.lastname,
              });
            });
          } else {
            return res.status(402).send({
              message: 'User already exists',
            });
          }
        });
      } catch (error) {
        res.status(500).send({ message: error });
      }
    } catch (error) {
      res.status(500).send({ message: 'error' });
    }
  } else {
    res.status(500).send({ message: value.message });
  }
};

export const login = async (req, res, next) => {
    let user;
    try {
      user = await User.findOne({ where: { email: req.body.email } });
    } catch (error) {
      res.status(402).send({ message: 'User not Found!' });
    }
    if (user) {
      try {
        const check = await bcrypt.compare(req.body.password, user.password);
        if (!check) {
          res.status(401).send({ message: 'Password Incorrect' });
        } else {
          const token = jwt.sign(
            { userId: user.idUser },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: '24H' }
          );
          res.status(201).send({
            email: user.email,
            userId: user.idUser,
            token: token,
            firstname: user.firstname,
            lastname: user.lastname,
          });
        }
      } catch (error) {
        res.status(401).send({
          message: 'Something went wrong!',
        });
      }
    } else {
      res.status(400).send({ message: 'User not Found' });
    }
};

/* FUNCTION TO GET A USER*/
export const getuser = async (req, res, next) => {
    try {
      const user = await User.findOne({
        attibrutes: {
          exclude: ['password', 'myDate', 'createAt', 'updateAt']
        },
        where: {
          idUser: req.params.id
        }
      });
      console.log(user.dataValues.firstname);
      console.log('123456')
      res.send(user.dataValues);
    } catch (error) {
      res.status(400).send({ message: "No user found" });
    }
};

  /* FUNCTION TO DELETE A USER*/
  export const deleteuser = async (req, res, next) => {
    try {
      const user = await User.destroy({ where: { email: req.params.id } });
      if (user === 1) {
        res.status(200).send({
          message: "User Deleted!"
        });
      } else {
        res.status(400).send({
          message: "No User Found!"
        });
      }
    } catch (error) {
      next(error);
    }
};

export const addpostreaduser = async (req, res, next) => {
    let arrayTags = [];
    try {
      const user = await User.findOne({ where: { idUser: req.body.userId } });
      const conditional = user.dataValues.tag_posts;
      if (conditional === null) {
        const num = req.body.postiD.toString();
        arrayTags.push(num);
        const newArray = arrayTags.toLocaleString();
        const user2 = await User.update({ tag_posts: newArray }, {
          where: {
            idUser: req.body.userId
          }
        });
        if (user2 === 1) {
          res.status(201).send({
            message: "comment viewed successfully"
          });
        } else {
          res.status(500).send({
            message: "comment is already viewed"
          });
        }
      } else {
        const tags = JSON.parse(JSON.stringify(user.dataValues.tag_posts.split(",")));
        let post_condition = true;
        for (let i = 0; i < tags.length; i++) {
          if (parseInt(tags[i]) === req.body.postiD) {
            post_condition = false;
            i = tags.length + 1;
          }
        }
        if (post_condition) {
          const tags = JSON.parse(JSON.stringify(user.dataValues.tag_posts));
          arrayTags.push(tags[i]);
        }
        const num = req.body.postiD.toString();
        arrayTags.push(num);
        const newArray = arrayTags.join(",");
        const user2 = await User.update({ tag_posts: newArray }, {
          where: {
            idUser: req.body.userId
          }
        });
        if (user2 === 1) {
          res.status(201).send({
            message: "comment viewed successfully"
          });
        } else {
          res.status(500).send({
            message: "comment is already viewed"
          });
        }
      }
    } catch (error) {
      res.status("error");
      if (error.number === 2627) {
        res.status(500).send({
          message: "Something went wrong!"
        });
      }
    }
};
  