var fs = require('fs'),
     $ = require('jquery');


var self = this;
fs.readFile('site/index.html', 'utf8', function (err, html) {
    if (err) throw err;        
    var $html = $(html),
        nav,
        recentSermons;
    nav = scrapper.getNavLinks($html); 
    recentSermons = scrapper.getRecentSermons($html); 
    console.log(recentSermons);
});

var scrapper = {
    getNavLinks: function($html) {
        var result = [],
        menu;
        menu = $html.find('#wrapper2 #header #masthead #access #menuContainer ul').html();
        $(menu).each(function(index, li) {
            var linkObj = {},
                $li = $(li);
            linkObj['name'] = $li.find('a').html();
            linkObj['link'] = $li.find('a').attr('href');
            linkObj['children'] = [];
            if($li.find('ul.children').length){
                $li.find('ul.children li').each(function(index, li) {
                    var linkObjChild = {},
                        $li = $(li);
                    linkObjChild['name'] = $li.find('a').html();
                    linkObjChild['link'] = $li.find('a').attr('href');
                    linkObj['children'].push(linkObjChild);
                });
            }
            result.push(linkObj);
        });
        return result;
    },

    getRecentSermons: function($html) {
        var result = [],
        table;
        sermonEls = $html.find('#wrapper2 #mainContainer #main table').children().find('td:first > p:not(:last)');
        $(sermonEls).each(function(i, el) {
            var sermonObj = {};
            sermonObj['date'] = $(el).find('strong').text();
            sermonObj['subtitle'] = $(el).find('a:last').attr('title');
            sermonObj['link'] = $(el).find('a:last').attr('href');            
            $(el).find('strong').remove();
            $(el).find('a').remove();
            sermonObj['title'] = $(el).text();
            result.push(sermonObj);
        });
        return result;
    }
};