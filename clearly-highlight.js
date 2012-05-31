function loadjs(callback) {
  var fileref = document.createElement('script');
  fileref.setAttribute('type', 'text/javascript');
  fileref.onload = callback;
  fileref.setAttribute('src', 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js');
  if (typeof fileref !== 'undefined') { document.getElementsByTagName('head')[0].appendChild(fileref); }
}

loadjs(function() {
  $('#readable_iframe').contents().find('head').append('<link rel=\'stylesheet\' type=\'text/css\' href=\'http://yandex.st/highlightjs/6.1/styles/solarized_dark.min.css\' />');
  $.getScript('http://yandex.st/highlightjs/6.1/highlight.min.js', function(){
    $('#readable_iframe').contents().find('pre').each(function() {
      var $this = $(this);
            var children = $this.children();
            console.log(children);
            if(children.length>0){
                
                var formated = false;
                children.find('li').each(function(){
                    formated=true;
                    $(this).replaceWith(function() {
                        var hl = hljs.highlightAuto($(this).text());
                        return '<li>' + hl.value + '</li>';
                    });
                });
                if(!formated){
                    $this.find('code').each(function(){
                        formated=true;
                        $(this).replaceWith(function() {
                            var hl = hljs.highlightAuto($(this).text());
                            return '<code>' + hl.value + '</code>';
                        });
                    });
                }
                if(!formated){
                    console.log('formating children');
                    children.wrapAll('<code><ol></ol></code>').each(function(){
                        formated=true;
                        $(this).replaceWith(function() {
                            var hl = hljs.highlightAuto($(this).text());
                            return '<li>' + hl.value + '</li>';
                        });
                    });
                }
            }else{
                console.log('formating not formated code');
                $(this).replaceWith(function() {
                    var hl = hljs.highlightAuto($(this).text());
                    return '<pre><code>' + hl.value + '</code></pre>';
                });
            }
     
    });
  });
});
