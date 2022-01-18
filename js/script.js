'use strict';

/**
 * IIFE
 *
 * 1. Create the module execution controller (MEC);
 * 2. Create the application controller for SmoothState and Mapping;
 * 3. Attach our app's initializer and the MEC's executor to jQuery's Ready handler (executes once);
 * 4. Replace jQuery's Ready handler with the MEC's registrar;
 * 5. Attach a module to the MEC (executes on jQuery's onReady event and all SmoothState onAfter events);
 */











var app = {};

;
(function($) {




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






    var $doc = $(document);

    /** [1] */
    $.readyFn = {
        list: [],
        register: function(fn) {
            console.log('Module Registered');

            $.readyFn.list.push(fn);
        },
        execute: function() {
            console.log('Modules Executing');

            for (var i = 0; i < $.readyFn.list.length; i++) {
                try {
                    $.readyFn.list[i].apply(document, [$]);
                } catch (e) {
                    throw e;
                }
            };
        }
    };

    /** [2] */
    app = {
        initSmoothState: function() {
            console.log('Module Executed: Smooth State');

        var $body = $('body'),
            $main = $('#page'),
            $site = $('html, body'),
            $vpw = $(window).outerWidth(),
            transition,
            smoothState;

            var $page = $('#page'),
                options = {
                    debug: true,
                    prefetch: true,
                    // cacheLength: 2,
                    anchors: 'a',
                    forms: false,
                    blacklist: 'input[type="submit"]',
                    blacklist: '.wp-link',
                    blacklist: '.woocommerce-LoopProduct-link',
                    blacklist: ".no-smoothstate, .post-edit-link,  a[href*='.jpg'], a[href*='.png'], a[href*='.jpeg'], a[href*='.pdf'], #activity-stream a, .bp-wrap a",
                    
                    onBefore: function( $anchor, $container) {
                        //console.log('onBefore');
                        var target = $anchor.attr('rel');
                    
                        if (target === 'next') {
                            transition = 'slideInRight';
                            console.log('fired next!');
                        } else if (target === 'fade') {
                            transition = 'fadeIn';
                            console.log('fired fade!');
                        } else {
                            transition = 'slideInLeft';
                            console.log('fired prev!');
                        }
                    },
                    onStart: {
                        duration: 250,
                        render: function($container) {


                                                if( transition === 'slideInRight' ){
                        $body.find('#elementor').addClass('next');
                    } else if( transition === 'fadeIn' ){
                        $body.find('#elementor').addClass('fade');
                    } else {
                        $body.find('#elementor').addClass('prev');
                    }



                            // Add your CSS animation reversing class
                            $container.addClass('slide-out');
                            // Restart your animation
                            app.smoothState.restartCSSAnimations();
                            $(".edit-link").hide();
                        }
                    },
                    onReady: {
                        duration: 0,
                        render: function($container, $newContent) {


                                                var url = app.smoothState.href // <-- get the current url
                    var doc = app.smoothState.cache[url].doc // <-- full html response
                    var html = $.htmlDoc( doc );

                                                //find old elementor custom stylsheet and tag it
                    $(document).find("#elementor-frontend-stylesheet, [id^='elementor-post-']").addClass('marked-for-removal');
                    



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
                    }, 100);



                            // Remove your CSS animation reversing class
                            $container.removeClass('slide-out');
                            // Inject the new content
                            $container.html($newContent);
                            // Inject the new content
                            $container.html($newContent);
                            $('html, body').animate({ scrollTop: 0 }, 0);
                        }
                    },
                    onEnd: {
                        duration: 250, // Duration of the animations, if any.
                        render: function(url, $container, $content) {
                            $body.css('cursor', 'auto');
                            $body.find('a').css('cursor', 'auto');
                            $container.html($content);
                            // Trigger document.ready and window.load
                            $(document).ready();
                            $(window).trigger('load');
                        }
                    },

                    onAfter: 
                        function($container, $newContent) {
                        $.readyFn.execute();
                        $(window).triggerHandler('load');
                    }
                };

            this.smoothState = $page.smoothState(options).data('smoothState');


        },



    };

    /** [3] */
    $doc.ready(function() {
        console.log('Initial Document Ready');

        app.initSmoothState();

        $.readyFn.execute();
    });

    /** [4] */
    $.fn.ready = $.readyFn.register;

})(jQuery);


/** [5] */
jQuery(document).ready(function($) {

        // 	VanillaTilt.init(document.querySelector(".tilt-card"), {
        //     max: 25,
        //     speed: 400,
        //   });


        $(".tilt-card").each(function (index, el) {
          VanillaTilt.init(el, {
            max: 5,
            speed: 500,
            reverse: true,
            scale: 1.05,
          });
        });


           jQuery(".play_card").click(function () {
             jQuery("#play_button_submit").trigger("click");
           });

        jQuery(".cashout_card").click(function () {
        jQuery("#btn-submit").trigger("click");
        });


                jQuery(".signout_card").click(function () {
                  jQuery("#signout_button_submit").trigger("click");
                });

});


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
        

        $("#rankings_table tr").each(function() {

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

    $('#rankings_table tbody tr').each(function(idx){
    $(this).children().first().html(idx + 1);
});




})
        .trigger('update');

        
    };

    $('#rankings_table').tablesorter({
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







    $('#user_stats').tablesorter({
        // theme: 'dropbox',
        emptyTo: 'zero',
        widgets: ['zebra', 'build', 'reflow'],
        sortList: [[0, 0]],
        widgetOptions: {
            // build_source: array,

                  // class name added to make it responsive (class name within media query)
      reflow_className    : 'ui-table-reflow2',
      // header attribute containing modified header name
      reflow_headerAttrib : 'data-name',
      // data attribute added to each tbody cell
      // it contains the header cell text, visible upon reflow
      reflow_dataAttrib   : 'data-title',

      build_type      : 'csv',
      build_source    : $('.csv2'),
      build_complete  : 'tablesorter-build-complete', // triggered event when build completes
            build_footers: {
                rows: 0
            },
            build_numbers: {
                // include row numbering column?
                // addColumn: "Rank",
                // make column sortable?
                sortable: true
            }
        },
        // initialized: function (table) {
        //     calculateDiff(table);
        // }
    });



});









// jQuery(document).ready(function($) {

//     'strict mode';
// let bbCard = document.getElementById('baseballCard');
// let flipper = document.getElementById('flipper');
// let isFlipped = /flipped/gi;

// function flip(el) {
//   el.className = isFlipped.test(el.className) ? '' : 'flipped';
// }

// bbCard.addEventListener("click", function() {
//   flip(flipper);
// }, false);

// });



    // jQuery(document).ready(function($) {
    //   var css = '-webkit-animation: spin 3s cubic-bezier(0, 0, 0.58, 1.05); animation-fill-mode: forwards;';
    //   spinLoop(css);
    // });
    // function spinLoop(css) {
    //   for (i = 0; i < 5; i++) {
    //     (function(i) {
    //       setTimeout(function() {
    //         $('#machine > #' + i).attr(
    //           'style', css
    //           );
    //       }, 150 * i);
    //     }(i));
    //   }
    // }



    jQuery(document).ready(function($) {
      var css = '-webkit-animation: spin 3s cubic-bezier(0, 0, 0.58, 1.05); animation-fill-mode: forwards;';
      spinLoop(css);
    });
    function spinLoop(css, $, i) {
      for (i = 0; i < 5; i++) {
        (function(i) {
          setTimeout(function() {
            jQuery('#machine > #' + i).attr(
              'style', css
              );
          }, 150 * i);
        }(i));
      }
    }




    // jQuery(".tilt-card").each(function ($, el) {
    //   VanillaTilt.init(el, {
    //     max: 25,
    //     speed: 500,
    //     reverse: true,
    //     scale: 1.05,
    //   });
    // });


    // 	VanillaTilt.init(document.querySelector(".tilt-card"), {
    //     max: 25,
    //     speed: 400,
    //   });







    jQuery(window, document, undefined).ready(function ($) {
      $("input").blur(function () {
        var $this = $(this);
        if ($this.val()) $this.addClass("used");
        else $this.removeClass("used");
      });

      var $ripples = $(".ripples");

      $ripples.on("click.Ripples", function (e) {
        var $this = $(this);
        var $offset = $this.parent().offset();
        var $circle = $this.find(".ripplesCircle");

        var x = e.pageX - $offset.left;
        var y = e.pageY - $offset.top;

        $circle.css({
          top: y + "px",
          left: x + "px",
        });

        $this.addClass("is-active");
      });

      $ripples.on(
        "animationend webkitAnimationEnd mozAnimationEnd oanimationend MSAnimationEnd",
        function (e) {
          $(this).removeClass("is-active");
        }
      );
    });