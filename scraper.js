var fs = require('fs'),
     $ = require('jquery');


var self = this;
fs.readFile('site/index.html', 'utf8', function (err, html) {
    if (err) throw err;        
    var $html = $(html),
        nav = scrapper.nav($html),
        recentSermons = scrapper.recentSermons($html),
        upcomingEvents = scrapper.upcomingEvents($html),
        dailyDevotional = scrapper.dailyDevotional($html),
        slider = scrapper.slider($html); 
    console.log(slider.length);
});

var scrapper = {
    nav: function($html) {
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

    recentSermons: function($html) {
        var result = [],
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
    },

    upcomingEvents: function($html) {
        var result = [],
        eventEls = $html.find('#wrapper2 #mainContainer #main table').children().find('td:eq(2) > p');
        $(eventEls).each(function(i, el) {
            var obj = {};
            obj['title'] = $(el).find('strong').text();
            $(el).find('strong').remove();
            obj['link'] = $(el).find('a').attr('href');            
            $(el).find('a').remove();            
            obj['subtitle'] = $.trim($(el).text());
            result.push(obj);
        });
        return result;
    },

    dailyDevotional: function($html) {

    },

    slider: function($html) {
        var result = [],
            sliderLinks = $html.find('#wrapper2 #mainContainer #mainHome #slider2 ul li a');
        $(sliderLinks).each(function(i, a) {
            var obj = {};
            obj.link = $(a).attr('href');
            obj.img = $(a).find('img').attr('src');
            obj.subtitle = $(a).find('img').attr('alt');
            result.push(obj);
        });
        return result;
    }
};