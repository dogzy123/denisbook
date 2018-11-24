import Component from "../utils/component";
import {post} from "../utils/requests";
import moment from "moment/moment";
import {store} from "../app";
import {removeRecord} from "../actions/actions";

const getPostContext = ({rowId, title, author, date, body}, Posts) => {
    return new Component('div.post')
        .observe(
            new Component('div.post-wrapper')
                .observe(
                    new Component('div.post-remove$⨯', {
                        onclick : () => store.dispatch( removeRecord(rowId) )
                    }),

                    new Component('h3', {
                        innerHTML : title
                    }),

                    new Component('div.post-sub-title')
                        .observe(
                            new Component('div.post-author')
                                .observe(
                                    new Component('span', {
                                        innerHTML : author
                                    })
                                ),

                            new Component('div.post-date', {
                                innerHTML : moment(date).format("DD MMMM, hh:mm")
                            })
                        ),

                    new Component('div.body', {
                        innerHTML : body
                    })
                )
        );
};

export default class Post {
    constructor ( data, Posts ) {
        const {rowId, author, title, text, dt} = data;

        this.rowId  = rowId;
        this.author = author;
        this.title  = title;
        this.body   = text;
        this.date   = dt;

        this.component   = getPostContext({...this}, Posts);

        return this;
    }

    getContext () {
        return this.component.context;
    }

    remove () {
        console.log(this.component.context.parentNode);
    }
}