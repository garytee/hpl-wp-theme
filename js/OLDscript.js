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
                    onStart: {
                        duration: 250,
                        render: function($container) {
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

