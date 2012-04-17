/*
    途中から固定されるアレ jQueryプラグイン
    IE6では動きません。
    @author Yuichi Takeuchi - http://takeyu-web.com/
    @version 0.0.1
    @date 2012.4.17
    @copyright (c) 2012 Yuichi Takeuchi
 */

/*
    <div id="header">
        <h1>HOGE</h1>
        <ul id="nav">
            <li><a href="#">TOP</a></li>
            <li><a href="#">Contents 1</a></li>
            <li><a href="#">Contents 2</a></li>
        </ul>
    </div>
    <div id="body">
    
    </div>
    <div id="footer">
        footer
    </div>
    
    $('ul#nav').fixedInTheScroll();
    $('#footer').fixedInTheScroll({bottom: 0});
 */


(function($){
    $.fn.fixedInTheScroll = function(opts) {
        opts = jQuery.extend({}, opts);
        $(this).each(function(){
            var elem = $(this);
            _fixedInTheScroll(elem, opts);
        });
    }
    
    function _fixedInTheScroll(elem, opts) {
        $(function(){
            var position = typeof(opts.bottom) != 'undefined' ? 'bottom' : 'top';
            var offset = elem.offset();
            var func = null;
            var className = 'fixed-'+position;
  
            // BK:IE7では最初に style でないノードが無いと style が生成されない
            // http://d.hatena.ne.jp/miya2000/20070327/p0
            var wrap=document.createElement('div');
            var pos = opts[position] || '0px';
            wrap.innerHTML='a<style type="text\/css">.'+className+'{ position: fixed; '+position+': '+pos+'; }<\/style>';
            document.getElementsByTagName('head')[0].appendChild(wrap.lastChild);

            switch (position){
            case 'bottom':
                func = function(){
                    if($(window).scrollTop()+$(window).height() < offset.top) {
                        elem.addClass(className);
                    } else {
                        elem.removeClass(className);
                    }
                };
                break;
            default:
                func = function(){
                    if($(window).scrollTop() > (offset.top) ) {
                        elem.addClass(className);
                    } else {
                        elem.removeClass(className);
                    }
                };
            }
            
            $(window).scroll(function () { func(); });
            func();
        });
    }
    
})(jQuery);
