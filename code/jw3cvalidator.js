(function($) {
    $.fn.w3cvalidate = function(url) {
        
        function getContent(url) {
            var content = "";
            var get = $.get(url, "", function(data) {}, "html");
            //return content;
            $.when(get).done(function(data) { content = data; });
            return content;
        }
        
        function getURLContents(obj, starturl) {
            var stack = new Array(starturl);
            var contents = new Array();
            var url = "";
            var hrefpattern = /<a[^>]*href="([^"<>]*)"[^>]*>/i;
            
            while(stack.length > 0) {
                obj.append(stack + "<br/>");
                url = stack.pop();
                contents[url] = getContent(url);
                obj.append(contents[url]);
                urls = contents[url].match(hrefpattern);
                obj.append(urls);
            }
        }
        
        return this.each(function() {
            getURLContents($(this), url);
        });
    };
})(jQuery);