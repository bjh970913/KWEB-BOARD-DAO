const Article = require('./article.model');

let BoardService;
// noinspection JSUnusedAssignment
(function (BoardService) {
  const dataStore = [];
  let dataCounter = 0;

  createArticle('dummy 001', 'dummy content 001');
  createArticle('dummy 002', 'dummy content 002');

  function createArticle(subject, content) {
    const newArticle = new Article(subject, content);
    dataCounter++;
    newArticle.id = dataCounter;
    dataStore.push(newArticle);
    return Object.assign({}, newArticle);
  }

  function updateArticle(id, subject, content) {
    const article = findById(id, true);
    if (article === null) {
      throw new Error('Try to update null Article');
    }

    article.subject = subject;
    article.content = content;
  }

  function findAll() {
    return dataStore.map(x => Object.assign({}, x));
  }

  function findById(id, _writeAble) {
    const findResult = dataStore.filter((x) => x.id === id);
    if (findResult.length === 1) {
      return _writeAble ? findResult[0] : Object.assign({}, findResult[0]);
    } else {
      return null;
    }
  }

  function deleteById(id) {
    const article = findById(id, true);
    if (article === null) {
      throw new Error('Try to delete null Article');
    }
    dataStore.splice(dataStore.indexOf(article), 1);
  }

  function deleteAll() {
    dataStore.splice(0, dataStore.length);
  }

  function truncate() {
    dataCounter = 0;
    dataStore.splice(0, dataStore.length);
  }

  BoardService.createArticle = createArticle;
  BoardService.updateArticle = updateArticle;
  BoardService.findAll = findAll;
  BoardService.findById = findById;
  BoardService.deleteById = deleteById;
  BoardService.deleteAll = deleteAll;
  BoardService.truncate = truncate;

  console.log('BoardService init OK');
})(BoardService = BoardService || (BoardService = {}));
module.exports = BoardService;
