const Article = require('./article.model');

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
    dataCounter = 0;
    dataStore.splice(0, dataStore.length);
    return Promise.resolve();
  }

  BoardService.createArticle = createArticle;
  BoardService.updateArticle = updateArticle;
  BoardService.findAll = findAll;
  BoardService.findById = findById;
  BoardService.deleteById = deleteById;
  BoardService.deleteAll = deleteAll;
  BoardService.truncate = truncate;


  BoardService.init = function () {
    dataStore = [];
    dataCounter = 0;
    console.log('BoardService init OK');
    return Promise.resolve(true);
  };
})(BoardService = BoardService || (BoardService = {}));
module.exports = BoardService;
