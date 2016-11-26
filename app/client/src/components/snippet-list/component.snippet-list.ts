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
        }
    },

    data: function(){
        return {
            pageIndex: -1,
        }
    },

    created: function() {
        this.loadMore();
    },

    methods: {
        loadMore: function() {
            this.pageIndex += 1;
            let calculatedlastElemOnPage = this.pageIndex * this.pageSize + this.pageSize;
            let lastElemOnPage = calculatedlastElemOnPage <= this.snippets.length ? calculatedlastElemOnPage : this.snippets.length;
            this.currentPage = _.slice(this.snippets, 0, lastElemOnPage);

            console.log("loadMore this.currentPage", this.currentPage);
            
            
            setTimeout(function(){
                hljs.initHighlighting.called = false;
                hljs.initHighlighting();
            }, 0)

        }
    }
};