class Article {
  constructor (id, subject, content) {
    if (Number.isNaN(id)) {
      this.id = null;
    } else {
      this.id = id;
    }
    this.subject = subject;
    this.content = content;
  }
}

module.exports = Article;
