export default class Post {
    constructor ( data ) {
        const {rowId, author, title, text, dt} = data;

        this.rowId  = rowId;
        this.author = author;
        this.title  = title;
        this.body   = text;
        this.date   = dt;
    }
}