<?php
/**
 * Redirect to first post from CPT
 */

$args = array(
     'orderby'        => 'menu_order', 
     'post_type'      => 'rankings', 
     'posts_per_page' => 1
);
$loop = query_posts($args);

if (have_posts()) :
	wp_redirect(get_permalink(), 302);exit();
endif;