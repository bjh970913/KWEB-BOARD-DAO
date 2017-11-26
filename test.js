const Assert = require('assert');
const Colors = require('colors');
const BoardService = require('./board.service');


const ArticleSubject1 = 'Article 1 !@# \" OR union"';
const ArticleSubject2 = 'Subject 2';

const ArticleContent1 = '@#FVQERB@WREBW$REB@$ERGBVWTRBWRTN';
const ArticleContent2 = '$#G!QREBWT$NW$%REGVWERDVWERVWERDS';

let Article1, Article2;
let UpdateContent1 = '@GEVQERNBW$REBWREB';

function CheckTruncate() {
  return BoardService.truncate()
      .then(BoardService.findAll)
      .then((sets) => Assert.equal(sets.length, 0));
}

function CheckCreate() {
  return BoardService.createArticle(ArticleSubject1, ArticleContent1)
      .then(a1 => Article1 = a1)
      .then(() => Assert.deepEqual(Article1, {
        id: 1,
        subject: ArticleSubject1,
        content: ArticleContent1
      }))
      .then(() => BoardService.createArticle(ArticleSubject2, ArticleContent2))
      .then(a2 => Article2 = a2)
      .then(() => Assert.deepEqual(Article2, {
        id: 2,
        subject: ArticleSubject2,
        content: ArticleContent2
      }));
}

function CheckRead() {
  return BoardService.findById(Article1.id)
      .then(x => Assert.deepEqual(Article1, x));
}

function CheckUpdate() {
  return BoardService.updateArticle(Article1.id, Article1.subject, UpdateContent1)
      .then(() => BoardService.findById(Article1.id))
      .then(x => Assert.notDeepEqual(Article1, x))
      .then(() => BoardService.findById(Article1.id))
      .then(x => Assert.equal(UpdateContent1, x.content));
}

function CheckDelete() {
  return BoardService.deleteById(Article1.id)
      .then(()=> BoardService.findById(Article1.id))
      .then(x => Assert.equal(null, x));
}

BoardService.init()
    .then(CheckTruncate)
    .then(CheckCreate)
    .then(CheckRead)
    .then(CheckUpdate)
    .then(CheckDelete)
    .then(() => {
      console.log(Colors.green('TEST OK'));
    })
    .catch((err) => {
      console.log(Colors.red(err.stack));
      console.log(Colors.red('TEST FAIL'));
    });
