<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package HPL
 */
get_header();
?>
<main id="primary" class="site-main">
    <?php
while (have_posts()):
    the_post();
    ?>
	    <div class="rankings_nav">
	        <?php
    $prevPost = get_previous_post();
    if ($prevPost) {
        $prevPostID = $prevPost->ID;
        ?>
	        <div>
	            <button id="rankingbtn">
	                <a class="next-post" href="<?php echo get_permalink($prevPostID); ?>">
	                    <span>
	                        <?php echo $prevPost->post_title; ?>
	                    </span>
	                    <i class="fas fa-arrow-circle-left"></i>
	                </a>
	            </button>
	        </div>
	        <?php
    } else {
        $latest_post = get_posts(array(
            'post_type' => 'rankings',
            'posts_per_page' => 1,
            'order' => 'DESC',
        ));
        ?>
	        <div>
	            <button id="rankingbtn">
	                <a class="next-post" href="<?php echo get_permalink($latest_post[0]->ID); ?>">
	                    <span>
	                        <?php echo get_the_title($latest_post[0]->ID); ?>
	                    </span>
	                    <i class="fas fa-arrow-circle-left"></i>
	                </a>
	            </button>
	        </div>
	        <?php }
    ?>
	        <div>
	            <h1 class="rankings_title"><?php echo get_the_title(); ?> Rankings</h1>
	        </div>
	        <?php
    $nextPost = get_next_post();
    if ($nextPost) {
        $nextPostID = $nextPost->ID;
        ?>
	        <div>
	            <button id="rankingbtn">
	                <a class="prev-post" href="<?php echo get_permalink($nextPostID); ?>">
	                    <i class="fas fa-arrow-circle-right"></i>
	                    <span>
	                        <?php echo $nextPost->post_title; ?>
	                    </span>
	                </a>
	            </button>
	        </div>
	        <?php } else {
        $first_post = get_posts(array(
            'post_type' => 'rankings',
            'posts_per_page' => 1,
            'order' => 'ASC',
        ));
        ?>
	        <div>
	            <button id="rankingbtn">
	                <a class="prev-post" href="<?php echo get_permalink($first_post[0]->ID); ?>">
	                    <i class="fas fa-arrow-circle-right"></i>
	                    <span>
	                        <?php echo get_the_title($first_post[0]->ID); ?>
	                    </span>
	                </a>
	            </button>
	        </div>
	        <?php }
    ?>
	    </div>
	    <?php
    get_template_part('template-parts/content', get_post_type());
    ?>
	    <div id="rankings_table"></div>
	    <?php
    if (comments_open() || get_comments_number()):
        comments_template();
    endif;
endwhile; // End of the loop.
?>
</main><!-- #main -->
<?php
get_footer();