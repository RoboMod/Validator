(function($) {
    $.fn.w3cvalidate = function(url) {
        
        //var content = "";
        
//        function getContent(url) {
//            var content = "";
//            var get = $.ajax({url: url, dataType: "html"});
//            //return content;
//            //$.when(get).done(function(data) { content = "data"; });
//            //while(get.statusCode())
//            while(get.state() == "pending") {
//                content = "";
//            }
//            content = get.
//            //alert(content);
//            return content;
//        }

        var stack;
        var contents;
        var hrefpattern = /<a[^>]*href="([^"<>]*)"[^>]*>/i;
        var basepattern = /<base[^>]*>href="([^"<>]*)"[^>]*>/;
        
//        function getURLContents(obj, starturl) {
//            var stack = new Array(starturl);
//            var contents = new Array();
//            var url = "";
//            var content = "";
//            var hrefpattern = /<a[^>]*href="([^"<>]*)"[^>]*>/i;
//            
//            while(stack.length > 0) {
//                obj.append(stack + "<br/>");
//                url = stack.pop();
//                content = getContent(url);
//                obj.append(content);
//                urls = content.match(hrefpattern);
//                obj.append(urls);
//                
//                contents[url] = content;
//            }
//        }
        
        function getURLContents(obj) {
            if(stack.length > 0) {
                obj.append(stack.length);
                var url = stack.pop();
                $.ajax({url: url, dataType: 'text'}).done(function(data, textStatus, jqXHR) {
                    contents[url] = data;
                    obj.append("<div class=\"jw3cvalidator-urllabel\">" + url + ":</div>\n\
                    <div class=\"jw3cvalidator-urlcontent\">Content:<br/>" + contents[url] + "</div>");

                    //var base = contents[url].match(basepattern);
                    //if(!base || base.length === 0) base = "";
                    var urls = contents[url].match(hrefpattern);
                    if(urls !== null) {
                        obj.append(urls.length + "<br/>")
                        for(var i = 0; i < urls.length; i++) {
                            var newUrl = makeAbsoluteUrl(urls[i]);
                            obj.append(stack.length + ":" + urls[i] + "; ");
                            if(!(urls[i] in contents)) stack.push(urls[i]);
                        }
                    }
                    getURLContents(obj);
                });
            }
        }
        
        function makeAbsoluteUrl(url) {
//            var absoluteUrl = url;
//            if(url.search(/:\/\//) < 0) {
//                if(absoluteUrl[0] === "/") absoluteUrl = absoluteUrl.substr(1);
//                absoluteUrl = "http://" + window.location.host + "/" + base +absoluteUrl;
//            }
            var absoluteUrl = $("<a href=\"" + url + "\">").attr('href');
            
            return absoluteUrl;
        }
        
        return this.each(function() {
            stack = new Array(makeAbsoluteUrl(url));
            contents = new Array();
            getURLContents($(this));
        });
    };
})(jQuery);