<?php
/**
 * HPL functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package HPL
 */

if ( ! defined( '_S_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( '_S_VERSION', '1.0.0' );
}

if ( ! function_exists( 'hpl_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function hpl_setup() {
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on HPL, use a find and replace
		 * to change 'hpl' to the name of your theme in all the template files.
		 */
		load_theme_textdomain( 'hpl', get_template_directory() . '/languages' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus(
			array(
				'menu-1' => esc_html__( 'Primary', 'hpl' ),
			)
		);

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support(
			'html5',
			array(
				'search-form',
				'comment-form',
				'comment-list',
				'gallery',
				'caption',
				'style',
				'script',
			)
		);

		// Set up the WordPress core custom background feature.
		add_theme_support(
			'custom-background',
			apply_filters(
				'hpl_custom_background_args',
				array(
					'default-color' => 'ffffff',
					'default-image' => '',
				)
			)
		);

		// Add theme support for selective refresh for widgets.
		add_theme_support( 'customize-selective-refresh-widgets' );

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support(
			'custom-logo',
			array(
				'height'      => 250,
				'width'       => 250,
				'flex-width'  => true,
				'flex-height' => true,
			)
		);
	}
endif;
add_action( 'after_setup_theme', 'hpl_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function hpl_content_width() {
	// This variable is intended to be overruled from themes.
	// Open WPCS issue: {@link https://github.com/WordPress-Coding-Standards/WordPress-Coding-Standards/issues/1043}.
	// phpcs:ignore WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
	$GLOBALS['content_width'] = apply_filters( 'hpl_content_width', 640 );
}
add_action( 'after_setup_theme', 'hpl_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function hpl_widgets_init() {
	register_sidebar(
		array(
			'name'          => esc_html__( 'Sidebar', 'hpl' ),
			'id'            => 'sidebar-1',
			'description'   => esc_html__( 'Add widgets here.', 'hpl' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);
}
add_action( 'widgets_init', 'hpl_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function hpl_scripts() {
	wp_enqueue_style( 'hpl-style', get_stylesheet_uri(), array(), _S_VERSION );
	wp_style_add_data( 'hpl-style', 'rtl', 'replace' );

	wp_enqueue_script( 'hpl-navigation', get_template_directory_uri() . '/js/navigation.js', array(), _S_VERSION, true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}

	wp_enqueue_style( 'tablesorter_dropbox', get_template_directory_uri() . '/css/theme.dropbox.css' );

	wp_enqueue_style( 'tablesorter_blackice', get_template_directory_uri() . '/css/theme.black-ice.css' );


	wp_enqueue_style( 'tablesorter_blackice', 'https://raw.githubusercontent.com/Mottie/tablesorter/master/css/theme.black-ice.css' );

	wp_enqueue_style('material_icons', 'https://fonts.googleapis.com/icon?family=Material+Icons');




    



	wp_enqueue_style( 'animate_css', get_template_directory_uri() . '/css/animate.min.css' );

    wp_enqueue_style( 'font_awesome', get_template_directory_uri() . '/css/all.min.css' );

	wp_enqueue_script( 'tablesorter', get_template_directory_uri() . '/js/jquery.tablesorter.js' );
	wp_enqueue_script( 'tablesorter_widgets', get_template_directory_uri() . '/js/jquery.tablesorter.widgets.js' );
	wp_enqueue_script( 'tablesorter_widgets_build_table', get_template_directory_uri() . '/js/widget-build-table.js' );

		wp_enqueue_script( 'script-js', get_template_directory_uri() . '/js/script.js', array( 'jquery' ) );

	wp_enqueue_script( 'smoothstate-js', get_template_directory_uri() . '/js/jquery.smoothState.js');

    wp_enqueue_script( 'tablesorter_widgets_reflow', get_template_directory_uri() . '/js/widget-reflow.js');


    wp_enqueue_script('vanilla_tiltjs', 'https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.7.2/vanilla-tilt.min.js');


}
add_action( 'wp_enqueue_scripts', 'hpl_scripts' );

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}

/**
 * Load WooCommerce compatibility file.
 */
if ( class_exists( 'WooCommerce' ) ) {
	require get_template_directory() . '/inc/woocommerce.php';
}



function custom_post_type_rankings() {

// Set UI labels for Custom Post Type
  $labels = array(
    'name'                => _x( 'Rankings', 'Post Type General Name', 'hpl' ),
    'singular_name'       => _x( 'Ranking', 'Post Type Singular Name', 'hpl' ),
    'menu_name'           => __( 'Rankings', 'hpl' ),
    'parent_item_colon'   => __( 'Parent Ranking', 'hpl' ),
    'all_items'           => __( 'All Rankings', 'hpl' ),
    'view_item'           => __( 'View Ranking', 'hpl' ),
    'add_new_item'        => __( 'Add New Ranking', 'hpl' ),
    'add_new'             => __( 'Add New', 'hpl' ),
    'edit_item'           => __( 'Edit Ranking', 'hpl' ),
    'update_item'         => __( 'Update Ranking', 'hpl' ),
    'search_items'        => __( 'Search Ranking', 'hpl' ),
    'not_found'           => __( 'Not Found', 'hpl' ),
    'not_found_in_trash'  => __( 'Not found in Trash', 'hpl' ),
  );
  
// Set other options for Custom Post Type
  
  $args = array(
    'label'               => __( 'rankings', 'hpl' ),
    'description'         => __( 'Ranking', 'hpl' ),
    'labels'              => $labels,
    'rewrite'             => array('slug' => 'rankings'),
    // Features this CPT supports in Post Editor
    'supports'            => array( 'title', 'editor', 'excerpt', 'author', 'thumbnail', 'revisions', 'custom-fields', ),
    // You can associate this CPT with a taxonomy or custom taxonomy. 
    // 'taxonomies'          => array( 'genres' ),
    /* A hierarchical CPT is like Pages and can have
    * Parent and child items. A non-hierarchical CPT
    * is like Posts.
    */  
    'hierarchical'        => false,
    'public'              => true,
    'show_ui'             => true,
    'show_in_menu'        => true,
    'show_in_nav_menus'   => true,
    'show_in_admin_bar'   => true,
    'menu_position'       => 20,
    'can_export'          => true,
    'menu_icon'           => 'dashicons-chart-area',
    'has_archive'         => true,
    'exclude_from_search' => false,
    'publicly_queryable'  => true,
    'capability_type'     => 'page',
  //   'capabilities' => array(
  //   // 'create_posts' => 'do_not_allow', // false < WP 4.5, credit @Ewout
  // ),
  // 'map_meta_cap' => true, // Set to `false`, if users are not allowed to edit/delete existing posts
  );
  
  // Registering your Custom Post Type
  register_post_type( 'Rankings', $args );

}

/* Hook into the 'init' action so that the function
* Containing our post type registration is not 
* unnecessarily executed. 
*/

add_action( 'init', 'custom_post_type_rankings', 4 );




/**
* Dequeue jQuery Migrate script in WordPress.
*/
function isa_remove_jquery_migrate( &$scripts) {
    if(!is_admin()) {
        $scripts->remove( 'jquery');
        $scripts->add( 'jquery', false, array( 'jquery-core' ), '1.12.4' );
    }
}
add_filter( 'wp_default_scripts', 'isa_remove_jquery_migrate' );






function custom_header_content() {

global $wp_query;


?>






  <div id="page" class="site">

    <a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', '_s' ); ?></a>
    


    <?php

}

add_action('wp_head', 'custom_header_content');





function custom_footer_content() {

	global $wp_query;


?>




</div>
<!-- page -->







<?php }
add_action('wp_footer', 'custom_footer_content' );







/**
 * 
 *
 * Change Login Image
 *
 * 
 */
     function custom_loginlogo() {
        $upload_dir = wp_upload_dir();

    	echo '<style type="text/css">
    // 	h1 a {background-image: url('.get_template_directory_uri('template_directory').'/images/HPL_login.png) !important;
    // }

                h1 a {background-image: url('.$upload_dir['baseurl'] . '/2020/07/HPL_Logo_V2_Favicon.png) !important;
    }



    .login h1 a{
    	-webkit-background-size: cover !important;
    	background-size: cover !important;
    	height: 185px !important;
    	width: 200px !important;
    }
    body.login {
    	background-color: #FFFFFF;
    }
    .login label {
    	font-size: 12px;
    	color: #555555;
    }
    .login input[type="text"]{
    	background-color: #ffffff;
    	border-color:#dddddd;
    	-webkit-border-radius: 4px;
    }
    .login input[type="password"]{
    	background-color: #ffffff;
    	border-color:#dddddd;
    	-webkit-border-radius: 4px;
    }
    .login .button-primary {
    	width: 120px;
    	float:right;
    	background-color:#17a8e3 !important;
    	background: -webkit-gradient(linear, left top, left bottom, from(#17a8e3), to(#17a8e3));
    	background: -webkit-linear-gradient(top, #17a8e3, #17a8e3);
    	background: -moz-linear-gradient(top, #17a8e3, #17a8e3);
    	background: -ms-linear-gradient(top, #17a8e3, #17a8e3);
    	background: -o-linear-gradient(top, #17a8e3, #17a8e3);
    	background-image: -ms-linear-gradient(top, #17a8e3 0%, #17a8e3 100%);
    	color: #ffffff;
    	-webkit-border-radius: 4px;
    	border: 1px solid #0d9ed9;
    }
    .login .button-primary:hover {
    	background-color:#17a8e3 !important;
    	background: -webkit-gradient(linear, left top, left bottom, from(#17a8e3), to(#0d9ed9 ));
    	background: -webkit-linear-gradient(top, #17a8e3, #0d9ed9 );
    	background: -moz-linear-gradient(top, #17a8e3, #0d9ed9 );
    	background: -ms-linear-gradient(top, #17a8e3, #0d9ed9 );
    	background: -o-linear-gradient(top, #17a8e3, #0d9ed9 );
    	background-image: -ms-linear-gradient(top, #0b436e 0%, #0d9ed9 100%);
    	color: #fff;
    	-webkit-border-radius: 4px;
    	border: 1px solid #0d9ed9;
    }
    .login .button-primary:active {
    	background-color:#17a8e3 !important;
    	background: -webkit-gradient(linear, left top, left bottom, from(#0d9ed9), to(#17a8e3));
    	background: -webkit-linear-gradient(top, #0d9ed9, #17a8e3);
    	background: -moz-linear-gradient(top, #0d9ed9, #17a8e3);
    	background: -ms-linear-gradient(top, #0d9ed9, #17a8e3);
    	background: -o-linear-gradient(top, #0d9ed9, #17a8e3);
    	background-image: -ms-linear-gradient(top, #0d9ed9 0%, #17a8e3 100%);
    	color: #fff;
    	-webkit-border-radius: 4px;
    	border: 1px solid #0d9ed9;
    }
    p#backtoblog {
    	display: none;
    }
    </style>';
}
add_action('login_head', 'custom_loginlogo');



/**
 * 
 *
 * Remove Comments on Custom Post Types but leave them on posts
 *
 * 
 */

function my_prefix_comments_open( $open, $post_id ) {
    $post_type = get_post_type( $post_id );
    // allow comments for built-in "post" post type
    if ( $post_type == 'post' ) {
        return true;
    }
    // disable comments for any other post types
    return false;
}
add_filter( 'comments_open', 'my_prefix_comments_open', 10 , 2 );






/**
* Redirect buddypress and bbpress pages to registration page
*/
function kleo_page_template_redirect()
{
    //if not logged in and on a bp page except registration or activation
    if( ! is_user_logged_in() &&
        ( ( ! bp_is_blog_page() && ! bp_is_activation_page() && ! bp_is_register_page() ) )
    )
    {
        wp_redirect( home_url( '/sorry' ) );
        exit();
    }
}
add_action( 'template_redirect', 'kleo_page_template_redirect' );



function tp_stop_guestes( $content ) {
    global $post;

    if ( $post->post_type == 'rankings' ) {
        if ( !is_user_logged_in() ) {
            // $content = 'Please login to view this post';

                    wp_redirect( home_url( '/sorry' ) );
        exit();
        }
    }

    return $content;
}

add_filter( 'template_redirect', 'tp_stop_guestes' );



// Clear Simple History items that are older than a 7 days (i.e. keep only the most recent 7 days in the log)
add_filter('simple_history/db_purge_days_interval', function ($days) {

    $days = 7;

    return $days;
});


add_filter('bp_get_send_public_message_button', '__return_false');



define ( 'BP_AVATAR_THUMB_WIDTH', 50 );
define ( 'BP_AVATAR_THUMB_HEIGHT', 50 );
define ( 'BP_AVATAR_FULL_WIDTH', 500 );
define ( 'BP_AVATAR_FULL_HEIGHT', 500 );
define ( 'BP_AVATAR_ORIGINAL_MAX_WIDTH', 640 );
// define ( 'BP_AVATAR_ORIGINAL_MAX_FILESIZE', $max_in_kb );




// function buddydev_modified_user_profile_name( $name ) {

//     $user_id = bp_displayed_user_id(); // You can Manipulate $name value using this user id

//     $name = bp_get_displayed_user_fullname();

//     return $name;

// }
// add_filter('bp_get_displayed_user_mentionname', 'buddydev_modified_user_profile_name');




// bp_core_remove_nav_item( 'notifications', 'members' );



/* Reorder profile tabs */

// function bbg_change_profile_tab_order() {

// global $bp;

// $bp->bp_nav['profile']['position'] = 10;

// $bp->bp_nav['trophycase']['position'] = 10;

// // $bp->bp_nav['home']['position'] = 20;

// // $bp->bp_nav['settings']['position'] = 30;

// // $bp->bp_nav['messages']['position'] = 40;

// // $bp->bp_nav['notifications']['position'] = 50;

// // $bp->bp_nav['activity']['position'] = 60;

// }

// add_action( 'bp_setup_nav', 'bbg_change_profile_tab_order', 999 );






// function my_func_remove_xprofile_tabs(){
// global $bp;
// // bp_core_remove_nav_item( 'events’ );
// bp_core_remove_nav_item( 'home', 'members' );

// bp_core_remove_nav_item( 'activity', 'members' );
// bp_core_remove_nav_item( 'settings', 'members' );
// bp_core_remove_nav_item( 'messages', 'members' );

// bp_core_remove_nav_item( 'notifications', 'members' );

// }
// add_action( 'bp_setup_nav', 'my_func_remove_xprofile_tabs', 15 );










// function trophycase() {
//       global $bp;
 
//       bp_core_new_nav_item( array( 
//             'name' => 'Trophy Case', 
//             'slug' => 'trophycase', 
//             'screen_function' => 'yourtab_screen', 
//             'position' => 40,
//             'parent_url'      => bp_loggedin_user_domain() . '/trophycase/',
//             'parent_slug'     => $bp->profile->slug,
//             'default_subnav_slug' => 'trophycase'
//       ) );
// }
// add_action( 'bp_setup_nav', 'trophycase' );
 
 
// function yourtab_screen() {
    
//     // Add title and content here - last is to call the members plugin.php template.
//     add_action( 'bp_template_title', 'yourtab_title' );
//     add_action( 'bp_template_content', 'yourtab_content' );
//     bp_core_load_template( 'buddypress/members/single/plugins' );
// }
// function yourtab_title() {
//     echo 'Title';
// }

// function yourtab_content() { 
//     echo 'Content';
// }


/* define the default Profile component */

// define("BP_DEFAULT_COMPONENT", "trophycase");

// Now when you click on a user name link, You will land on User's profile not user's activity page



// Allow SVG
add_filter( 'wp_check_filetype_and_ext', function($data, $file, $filename, $mimes) {

  global $wp_version;
  if ( $wp_version !== '4.7.1' ) {
     return $data;
  }

  $filetype = wp_check_filetype( $filename, $mimes );

  return [
      'ext'             => $filetype['ext'],
      'type'            => $filetype['type'],
      'proper_filename' => $data['proper_filename']
  ];

}, 10, 4 );

function cc_mime_types( $mimes ){
  $mimes['svg'] = 'image/svg+xml';
  return $mimes;
}
add_filter( 'upload_mimes', 'cc_mime_types' );

function fix_svg() {
  echo '<style type="text/css">
        .attachment-266x266, .thumbnail img {
             width: 100% !important;
             height: auto !important;
        }
        </style>';
}
add_action( 'admin_head', 'fix_svg' );





/**
 * A BuddyPress class for user creation simplicity
 *
 * @author Aaron Brazell <aaron@technosailor.com>
 * @package ab-bp-prepopulate-users
 */
class BP_Prepopulate_Users {

    // MySQL default limit is 1000, but you might have more users, so modify this value accordingly.
    const USERS_NUMBER = 1000;
    
    /**
     * PHP constructor method. Requires PHP 5.2+
     *
     * @author Aaron Brazell <aaron@technosailor.com>
     * @package ab-bp-prepopulate-users
     */
    public function __construct() {
        $this->hooks();
    }

    /**
     * Method to tie methods in this class into the WordPress hook system
     *
     * @author Aaron Brazell <aaron@technosailor.com>
     * @package ab-bp-prepopulate-users
     * @return void
     */
    public function hooks() {
        // Fix existing users. Will only ever be run once
        add_action( 'wp_loaded', array( $this, 'retroactive_user_fix' ) );

        // New users get the last_active meta
        add_action( 'user_register', array( $this, 'user_active_on_create' ) );
    }

    /**
     * A method for retroactively loading existing users with the last_active meta_key. BuddyPress will not show
     * users who have never logged in so this is a quick fix to get around that problem. Method stores the abbp_retroactive
     * option in the WordPress options table after it is run once on page load. After that, the method short circuits
     * if the option exists, preventing unnecessary database queries in the future.
     *
     * @author Aaron Brazell <aaron@technosailor.com>
     * @package ab-bp-prepopulate-users
     * @return void
     */
    public function retroactive_user_fix() {
        if( get_option( 'abbp_retroactive' ) ) {
            return;
        }

        $users = get_users( array(
            'fields' => 'ID',
            'number' => BP_Prepopulate_Users::USERS_NUMBER
        ) );

        foreach( $users as $user_id ) {
            // Check to see if the user has activity
            if ( bp_get_user_last_activity( $user_id ) ) {
                continue;
            }
            
            // Inactive so lets activate
            bp_update_user_last_activity( $user_id, bp_core_current_time() );
        }
        
        // Clean transient cache
        delete_transient( 'bp_active_member_count' );
                   
        // Only do this once so not to tax the database unnecessarily
        add_option( 'abbp_retroactive', true );
    }

    /**
     * A method for pre-populating the last_active meta_key in the usermeta table. BuddyPress only displays users with
     * this key so we force the user to have that key to get around the limitation. Hooks on the user_register hook.
     *
     * @author Aaron Brazell <aaron@technosailor.com>
     * @package ab-bp-prepopulate-users
     * @return void
     */
    public function user_active_on_create( $user_id ) {
        bp_update_user_last_activity( $user_id, bp_core_current_time() );
        
        // Clean transient cache, just in case
        delete_transient( 'bp_active_member_count' );
    }
}

new BP_Prepopulate_Users;







function my_bp_members_per_page( $retval ) {
    $retval['per_page'] = 40;

    return $retval;
}
add_filter( 'bp_after_has_members_parse_args', 'my_bp_members_per_page' );





function admin_theme_style()
{
  wp_enqueue_style( 'admin-theme', get_stylesheet_directory_uri() . '/css/wp-admin.css' );
}
add_action('admin_enqueue_scripts', 'admin_theme_style');
add_action('login_enqueue_scripts', 'admin_theme_style');






function add_cors_http_header(){
    header("Access-Control-Allow-Origin: *");
}
add_action('init','add_cors_http_header');




// Remove admin bar for non-admin users only

add_action('after_setup_theme', 'remove_admin_bar');
function remove_admin_bar()
{
    if (!current_user_can('administrator') && !is_admin()) {
        show_admin_bar(false);
    }
}









function wpcc_front_end_login_fail($username)
{
    $referrer = $_SERVER['HTTP_REFERER'];
    if (!empty($referrer) && !strstr($referrer, 'wp-login') && !strstr($referrer, 'wp-admin')) {
        $referrer = esc_url(remove_query_arg('login', $referrer));
        wp_redirect($referrer . '?login=failed');
        exit;
    }
}
add_action('wp_login_failed', 'wpcc_front_end_login_fail');

function custom_authenticate_wpcc($user, $username, $password)
{
    if (is_wp_error($user) && isset($_SERVER['HTTP_REFERER']) && !strpos($_SERVER['HTTP_REFERER'], 'wp-admin') && !strpos($_SERVER['HTTP_REFERER'], 'wp-login.php')) {
        $referrer = $_SERVER['HTTP_REFERER'];
        foreach ($user->errors as $key => $error) {
            if (in_array($key, array('empty_password', 'empty_username'))) {
                unset($user->errors[$key]);
                $user->errors['custom_' . $key] = $error;
            }
        }
    }

    return $user;
}
add_filter('authenticate', 'custom_authenticate_wpcc', 31, 3);

