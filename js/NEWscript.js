(function($){
  
    'use strict';
    
    /*
    * jQuery htmlDoc "fixer" - v0.2pre - 8/8/2011
    * http://benalman.com/projects/jquery-misc-plugins/
    *
    * Copyright (c) 2010 "Cowboy" Ben Alman
    * Dual licensed under the MIT and GPL licenses.
    * http://benalman.com/about/license/
    */
    
    // RegExp that matches opening and closing browser-stripped tags.
    // $1 = slash, $2 = tag name, $3 = attributes
    var matchTag = /<(\/?)(html|head|body|title|base|meta)(\s+[^>]*)?>/ig;
    
    // Unique id prefix for selecting placeholder elements.
    var prefix = 'hd' + +new Date;
    
    // A node under which a temporary DOM tree can be constructed.
    var parent;

    $.htmlDoc = function(html) {
        // A collection of "intended" elements that can't be rendered cross-browser
        // with .innerHTML, for which placeholders must be swapped.
        var elems = $();
        // Input HTML string, parsed to include placeholder DIVs. Replace HTML,
        // HEAD, BODY tags with DIV placeholders.
        var htmlParsed = html.replace(matchTag, function(tag, slash, name, attrs) {
            // Temporary object in which to hold attributes.
            var obj = {};
            // If this is an opening tag...
            if ( !slash ) {
                // Add an element of this name into the collection of elements. Note
                // that if a string of attributes is added at this point, it fails.
                elems = elems.add('<' + name + '/>');
                // If the original tag had attributes, create a temporary div with
                // those attributes. Then, copy each attribute from the temporary div
                // over to the temporary object.
                if ( attrs ) {
                    $.each($('<div' + attrs + '/>')[0].attributes, function(i, attr) {
                        obj[attr.name] = attr.value;
                    });
                }
                // Set the attributes of the intended object based on the attributes
                // copied in the previous step.
                elems.eq(-1).attr(obj);
            }
            // A placeholder div with a unique id replaces the intended element's
            // tag in the parsed HTML string.
            return '<' + slash + 'div'
            + (slash ? '' : ' id="' + prefix + (elems.length - 1) + '"') + '>';
        });
        
        // If no placeholder elements were necessary, just return normal
        // jQuery-parsed HTML.
        if ( !elems.length ) {
            return $(html);
        }
        // Create parent node if it hasn't been created yet.
        if ( !parent ) {
            parent = $('<div/>');
        }
        // Create the parent node and append the parsed, place-held HTML.
        parent.html(htmlParsed);
        // Replace each placeholder element with its intended element.
        $.each(elems, function(i) {
            var elem = parent.find('#' + prefix + i).before(elems[i]);
            elems.eq(i).html(elem.contents());
            elem.remove();
        });
        // Return the topmost intended element(s), sans text nodes, while removing
        // them from the parent element with unwrap.
        return parent.children().unwrap();
    };


    //setup our smoothstate.js
    $(document).ready(function(){
    
        var $body = $('body'),
            $main = $('#page'),
            $site = $('html, body'),
            $vpw = $(window).outerWidth(),
            transition,
            smoothState;
            
        var options = {
            //anchors: 'a',
            //hrefRegex: '',
            prefetch: true,
            cacheLength: 4,
            //debug: true,
            blacklist: 'form, .no-smoothState, .hamburger, .contact, input',
            forms: 'form',
            //allowFormCaching: true,
            //repeatDelay: 500,
            prefetchOn: 'mouseover touchstart',
            locationHeader: 'X-SmoothState-Location',
            loadingClass: 'is-loading',
            scroll: false,
            // Param `request` is an `Object` that is currently set to be used
            /*alterRequest: function(request) {
            // Must return and `Object` that will be used to make the request
              return request;
            },*/
            // Param `state` is an `Object` that contains the container ID, by default
            /*alterChangeState: function(state) {
                // Must return a serializable `Object` that is associated with the history entry
                return state;
            },*/
            onBefore: function( $anchor, $container) {
                //console.log('onBefore');
                var target = $anchor.attr('rel');
            
                if (target === 'next') {
                    transition = 'slideInRight';
                    //console.log('fired next!');
                } else if (target === 'fade') {
                    transition = 'fadeIn';
                    //console.log('fired fade!');
                } else {
                    transition = 'slideInLeft';
                    //console.log('fired prev!');
                }
            },
            onStart: {
                duration: 400,
                render: function (url, $container) {
                    //console.log('onStart');
                    $main.addClass('is-exiting');
                    if( transition === 'slideInRight' ){
                        $body.find('#elementor').addClass('next');
                    } else if( transition === 'fadeIn' ){
                        $body.find('#elementor').addClass('fade');
                    } else {
                        $body.find('#elementor').addClass('prev');
                    }
                    $site.animate({scrollTop: 0});
                }
            },
            /*onProgress: {
                // How long this animation takes
                duration: 0,
                // A function that dictates the animations that take place
                render: function ($container) {}
            },*/
            onReady: {
                duration: 0,
                render: function ($container, $newContent) {
                    //console.log('onReady');
                    var url = smoothState.href // <-- get the current url
                    var doc = smoothState.cache[url].doc // <-- full html response
                    var html = $.htmlDoc( doc );
                    
                    //find old elementor custom stylsheet and tag it
                    $(document).find("#elementor-frontend-stylesheet, [id^='elementor-post-']").addClass('marked-for-removal');
                    
                    //capture webform data
                    var post_id = $(document).find('input[name="post_id"]').val();
                    var form_id = $(document).find('input[name="form_id"]').val();
                    var _nonce  = $(document).find('input[name="_nonce"]').val();
                    var v_email = $(document).find('input[placeholder="Email"]').val();
                    var v_msg   = $(document).find('textarea[placeholder="Message"]').val();
                    var v_name  = $(document).find('input[placeholder="Name"]').val();
                    var v_phone = $(document).find('input[placeholder="Phone"]').val();
                    
                    //if we have form data, create data object
                    if( v_name && v_email && v_phone ){
                        var webform = [
                            {
                                "post_id"   : post_id,
                                "form_id"   : form_id,
                                "_nonce"    : _nonce,
                                "email"     : v_email,
                                "message"   : v_msg,
                                "name"      : v_name,
                                "phone"     : v_phone
                            }
                        ];
                        //console.log( webform ); //webform object, just need to know how to post
                    }
                  
                    //suggested by team pojo but results in Uncaught TypeError
                    //elementorFrontend.hooks.doAction( 'frontend/element_ready/form.default' );
                    
                    //put new elementor custom css into head
                    html.find( '#elementor-frontend-stylesheet' ).appendTo('head');
                    html.find( '[id^="elementor-post-"]' ).appendTo('head');
                    $('.project-button a').attr('rel','fade');
                  
                    setTimeout(function(){
                        $(document).find('.marked-for-removal').remove(); //remove old elementor custom css
                        $('body').addClass('smoothState');
                    }, 1500);
                        
                    if( transition === 'slideInRight'){
                        $newContent.find('.elementor').addClass('prev');
                    } else if( transition === 'fadeIn'){
                        $newContent.find('.elementor').addClass('fade');
                    } else {
                        $newContent.find('.elementor').addClass('next');  
                    }
                    
                    $container.html($newContent);
                    setTimeout(function(){
                        $body.find('.elementor').removeClass('prev next fade');
                        // $('.page-template .col-b p').fakeScroll();
                    }, 100);
                    $container.removeClass('is-exiting');
                }
            },
            onAfter: function( $container ){
                //suggested by team pojo but results in Uncaught TypeError
                //elementorFrontend.hooks.doAction( 'frontend/element_ready/form.default' );
                elementorFrontend.init(); //however this appears to work!
            }
        }
        //initialize
        smoothState = $main.smoothState( options ).data('smoothState');
        
        //swpe nav
        $body.on({
            swiperight: function ( e, data ) {
                $("a[rel='prev']")[0].click();
                //console.log('swiped right!');
            },
            swipeleft: function ( e, data ) {
                $("a[rel='next']")[0].click();
                //console.log('swiped left!');
            },
        }, '.elementor');
        
        //toggle project information box
        $body.on('click', '.open-text a, .close-text a', function(e){
            e.preventDefault();
            //console.log(e);
            var container = $('.page-template .col-b');
    
            if ( $(e.target).hasClass('fa-info-circle') ) {
                container.addClass('open');
            } else {
                container.removeClass('open');
            }
        });
        
        //elementor-toggle-title
        $body.on('click', '.elementor-toggle-title', function(e){
            e.preventDefault();
            e.stopImmediatePropagation();
            //console.log(e);
            var container = $(e.target);
    
            if($('body').hasClass('smoothState')){
                if ( $(e.target).hasClass('active') ) {
                    container.removeClass('active');
                    container.next().slideUp();
                } else {
                    container.addClass('active');
                    container.next().slideDown();
                }
            }
        });
        
        // $('.page-template .col-b p').fakeScroll();
        
        $("body").on("click",".hamburger", function(event){
            //console.log("clicked!");
            //console.log($(event.target));
            $(".hamburger.upper").toggleClass("is-active");
            $("#masthead").toggleClass("expanded");
            $("#site-navigation").toggleClass("toggled");
        });
        
        $("body").on("click", '.contact a', function(e){
            e.preventDefault();
            $(".contact-modal").addClass("open");
            //console.log("opened");
        });
        $("body").on("click", ".modal-close a", function(e){
            e.preventDefault();
            $(".contact-modal").removeClass("open");
            //console.log("closed");
        });

  });
  
})(jQuery);


    jQuery(document).ready(function($) {


    // var array = [
    //     ["Name", "Points", "Last Rank", "New Rank", "Diff"],
    //     ["Sean Monagle", "30.5", "1", "1", ""],
    //     ["Jonathan Rubinstein", "28.5", "2", "2", ""],
    //     ["Frank Stallone", "16.5", "3", "3", ""],
    //     ["Dave Henriquez", "16.0", "6", "4", ""],
    //     ["Marc Bradley Johnson", "13.5", "4", "5", ""],
    //     ["Marcos Fernandez", "13.0", "7", "6", ""],
    //     ["J.P. Zapata", "12.5", "5", "7", ""],
    //     ["Ben Koehler", "11", "12", "8", ""],
    //     ["Lucas Howard", "8", "8", "9", ""],
    //     ["Gary Tietjen", "6", "10", "10", ""]
    // ],





var
    // time column (zero-based index)
    oldrankColumn = 3,
    newrankColumn = 4,
    diffColumn = 5,


    calculateDiff = function (table) {
        

        $("#result tr").each(function() {

    var td1 = parseFloat($(this).children("td:nth-child(6)").text()),
        td2 = parseFloat($(this).children("td:nth-child(5)").text()),
        difference = (td2 - td1),
        absNum = Math.abs(difference),
        largerNum = td1 > td2 ? td1 : td2,
        percentage = ((absNum / largerNum) * 100).toFixed(2);
        

    if (difference == 0)
       $(this).children("td:nth-child(7)").text(difference).addClass("yellow").closest('tr').find('td:nth-child(2)').addClass("yellow").append('<span class="yellowline"><i class="fas fa-horizontal-rule"></i></span>');
    else if (difference < 0)
       $(this).children("td:nth-child(7)").text(difference).addClass("red").closest('tr').find('td:nth-child(2)').addClass("red").append('<span class="redarrow"><i class="fas fa-caret-down"></i>' + absNum + '</span>');
    else if (isNaN(difference))  
       $(this).children("td:nth-child(7)").text(difference).addClass("yellow").closest('tr').find('td:nth-child(2)').addClass("yellow").append('<span style="display: none;"><i class="fas fa-horizontal-rule" style="color: yellow;"></i></span>');  
    else 
        $(this).children("td:nth-child(7)").text(difference).addClass("green").closest('tr').find('td:nth-child(2)').addClass("green").append('<span class="greenarrow"><i class="fas fa-caret-up"></i>' + difference + '</span>');


// if ($("tr").has("td.yellow").length > 0) {
//     // has specialclass
//        $(this).children("td:nth-child(2)").addClass("yellow");


// }


    // $(this).children("td:nth-child(1)").first().html(idx + 1);

    $('#result tbody tr').each(function(idx){
    $(this).children().first().html(idx + 1);
});




})
        .trigger('update');

        
    };

    $('#result').tablesorter({
        theme: 'dropbox',
        emptyTo: 'zero',
        widgets: ['zebra', 'build', 'reflow'],
        sortList: [[3, 1]],
        widgetOptions: {
            // build_source: array,

                  // class name added to make it responsive (class name within media query)
      reflow_className    : 'ui-table-reflow',
      // header attribute containing modified header name
      reflow_headerAttrib : 'data-name',
      // data attribute added to each tbody cell
      // it contains the header cell text, visible upon reflow
      reflow_dataAttrib   : 'data-title',

      build_type      : 'csv',
      build_source    : $('.csv'),
      build_complete  : 'tablesorter-build-complete', // triggered event when build completes
            build_footers: {
                rows: 0
            },
            build_numbers: {
                // include row numbering column?
                addColumn: "Rank",
                // make column sortable?
                sortable: true
            }
        },
        initialized: function (table) {
            calculateDiff(table);
        }
    });
});

