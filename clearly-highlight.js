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
    var ol = $this.find('code ol')    
    if(ol){
        ol.find('li').each(function(){
            $(this).replaceWith(function() {
            var hl = hljs.highlightAuto($(this).text());
            return '<li>' + hl.value + '</li>';
            });
        });
    }else
    $(this).replaceWith(function() {
        var hl = hljs.highlightAuto($(this).text());
        return '<pre><code>' + hl.value + '</code></pre>';
      });
    });
  });
});
