const Assert = require('assert');
const BoardService = require('./board.service');


const ArticleSubject1 = 'Article 1 !@# \" OR union"';
const ArticleSubject2 = 'Subject 2';

const ArticleContent1 = '@#FVQERB@WREBW$REB@$ERGBVWTRBWRTN';
const ArticleContent2 = '$#G!QREBWT$NW$%REGVWERDVWERVWERDS';

let Article1,Article2;
let UpdateContent1 = '@GEVQERNBW$REBWREB';

function CheckTruncate() {
  BoardService.truncate();
  Assert.equal(BoardService.findAll().length, 0);
}

function CheckCreate(){
  Article1 = BoardService.createArticle(ArticleSubject1, ArticleContent1);

  Assert.deepEqual(Article1, {
    id: 1,
    subject: ArticleSubject1,
    content: ArticleContent1
  });

  Article2 = BoardService.createArticle(ArticleSubject2, ArticleContent2);

  Assert.deepEqual(Article2, {
    id: 2,
    subject: ArticleSubject2,
    content: ArticleContent2
  });
}

function CheckRead() {
  Assert.deepEqual(Article1, BoardService.findById(Article1.id));
}

function CheckUpdate(){
  BoardService.updateArticle(Article1.id, Article1.subject, UpdateContent1);

  Assert.notDeepEqual(Article1, BoardService.findById(Article1.id));
  Assert.equal(UpdateContent1, BoardService.findById(Article1.id).content);
}

function CheckDelete () {
  BoardService.deleteById(Article1.id);
  Assert.equal(null, BoardService.findById(Article1.id));
}

setTimeout(CheckTruncate, 500);
setTimeout(CheckCreate, 1000);
setTimeout(CheckRead, 1500);
setTimeout(CheckUpdate, 2000);
setTimeout(CheckDelete, 2500);
