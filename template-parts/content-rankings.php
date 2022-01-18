<?php
/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package HPL
 */
?>
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <header class="entry-header">
        <?php
		if ( is_singular() ) :
		?>
        <?php if ( have_rows( 'player_info' ) ) : ?>
        <div class="csv" style="display:none;">
            Name, Game Points, Total Points, Last Rank, New Rank, Diff
            <?php while ( have_rows( 'player_info' ) ) : the_row(); ?>
            <?php the_sub_field( 'name' ); ?>,<?php the_sub_field( 'game_points' ); ?>,<?php the_sub_field( 'total_points' ); ?>,<?php the_sub_field( 'last_rank' ); ?>,<?php the_sub_field( 'new_rank' ); ?>,""
            <?php endwhile; ?>
        </div>
        <?php else : ?>
        <?php // no rows found ?>
        <?php endif; ?>
        <?php
		else :
			the_title( '<h2 class="entry-title"><a href="' . esc_url( get_permalink() ) . '" rel="bookmark">', '</a></h2>' );
		endif;
		if ( 'post' === get_post_type() ) :
			?>
        <div class="entry-meta">
            <?php
				hpl_posted_on();
				hpl_posted_by();
				?>
        </div><!-- .entry-meta -->
        <?php endif; ?>
    </header><!-- .entry-header -->
    <?php hpl_post_thumbnail(); ?>
    <div class="entry-content">
        <?php
		the_content(
			sprintf(
				wp_kses(
					/* translators: %s: Name of current post. Only visible to screen readers */
					__( 'Continue reading<span class="screen-reader-text"> "%s"</span>', 'hpl' ),
					array(
						'span' => array(
							'class' => array(),
						),
					)
				),
				wp_kses_post( get_the_title() )
			)
		);
		wp_link_pages(
			array(
				'before' => '<div class="page-links">' . esc_html__( 'Pages:', 'hpl' ),
				'after'  => '</div>',
			)
		);
		?>
    </div><!-- .entry-content -->
    <footer class="entry-footer">
        <?php hpl_entry_footer(); ?>
    </footer><!-- .entry-footer -->
</article><!-- #post-<?php the_ID(); ?> -->