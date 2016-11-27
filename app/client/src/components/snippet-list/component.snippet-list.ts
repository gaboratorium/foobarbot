import * as fs from "fs";
import { SnippetComponent } from "./../snippet/component.snippet";

var marked = require('marked');
var hljs = require("highlight.js");
var _ = require("lodash");

hljs.configure({
  tabReplace: '  '
})

export const SnippetListComponent = {
	name: "SnippetListComponent",
	template: fs.readFileSync(__dirname + '/component.snippet-list.html', 'utf8'),
    components: {
        "snippet": SnippetComponent
    },
    props: {
        snippets: {
            type: Array,
            required: true
        },
        pageSize: {
            type: Number,
            required: true
        },
        listName: {
            type: String
        }
    },

    data: function(){
        return {
            pageIndex: -1,
            currentPage: Array,
            showLoadMoreButton: true,
            showSnippets: false
        }
    },

    created: function() {
        this.loadMore();
        this.showSnippets = false;
    },

    methods: {
        loadMore: function() {
            this.pageIndex += 1;
            let lastIndex = this.pageIndex * this.pageSize + this.pageSize;
            lastIndex = lastIndex <= this.snippets.length ? lastIndex : this.snippets.length;
            this.showLoadMoreButton = lastIndex !== this.snippets.length;
            this.currentPage = _.slice(this.snippets, 0, lastIndex);
            var SnippetListComponent = this;
            
            setTimeout(function(){
                hljs.initHighlighting.called = false;
                hljs.initHighlighting();
                SnippetListComponent.showSnippets = true;
            }, 0)

        }
    }
};