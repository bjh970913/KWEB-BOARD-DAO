const Article = require('./article.model');
const Mysql = require('mysql');

let BoardService;
// noinspection JSUnusedAssignment
(function (BoardService) {
  let dataStore = [];
  let dataCounter = 0;

  createArticle('dummy 001', 'dummy content 001');
  createArticle('dummy 002', 'dummy content 002');

  function createArticle(subject, content) {
    const newArticle = new Article(subject, content);
    dataCounter++;
    newArticle.id = dataCounter;
    dataStore.push(newArticle);
    return Promise.resolve(Object.assign({}, newArticle));
  }

  function updateArticle(id, subject, content) {
    return findById(id, true)
        .then(article => {
          if (article === null) {
            return Promise.reject(new Error('Try to update null Article'));
          }

          article.subject = subject;
          article.content = content;

          return Promise.resolve();
        });
  }

  function findAll() {
    return Promise.resolve(dataStore.map(x => Object.assign({}, x)));
  }

  function findById(id, _writeAble) {
    const findResult = dataStore.filter((x) => x.id === id);
    if (findResult.length === 1) {
      return Promise.resolve(_writeAble ? findResult[0] : Object.assign({}, findResult[0]));
    } else {
      return Promise.resolve(null);
    }
  }

  function deleteById(id) {
    return findById(id, true)
        .then(article => {
          if (article === null) {
            return Promise.reject(new Error('Try to delete null Article'));
          }
          dataStore.splice(dataStore.indexOf(article), 1);
          return Promise.resolve();
        });
  }

  function deleteAll() {
    dataStore.splice(0, dataStore.length);
    return Promise.resolve();
  }

  function truncate() {
    return new Promise((resolve, reject) => {
      dataStore.query('truncate Board', (err, data)=> {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      })
    });
  }

  BoardService.createArticle = createArticle;
  BoardService.updateArticle = updateArticle;
  BoardService.findAll = findAll;
  BoardService.findById = findById;
  BoardService.deleteById = deleteById;
  BoardService.deleteAll = deleteAll;
  BoardService.truncate = truncate;


  BoardService.init = function () {
    dataStore = Mysql.createConnection({
      host: '127.0.0.1',
      user: 'kweb',
      password: 'kweb',
      database: 'kweb_board'
    });

    return new Promise((resolve, reject) => {
      dataStore.connect((err) => {
        if (err) {
          reject(err);
        } else {
          console.log('BoardService init OK');

          dataStore.query(`
            CREATE TABLE IF NOT EXISTS Board (
              id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
              subject VARCHAR(255),
              content TEXT
            );
          `, (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        }
      });
    });
  };
})(BoardService = BoardService || (BoardService = {}));
module.exports = BoardService;
