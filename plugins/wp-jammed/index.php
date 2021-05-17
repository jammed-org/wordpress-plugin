<?php
/**
 * Plugin Name: Jammed bookings for Wordpress
 * Plugin URI: https://github.com/jammed-org/wordpress-plugin
 * Description: This is a plugin for loading the Jammed booking app on Wordpress
 * Version: 1.0.0
 * Author: Jammed
 *
 * @package wp-jammed
 */

// defined( 'ABSPATH' ) || exit;

/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 *
 * Passes translations to JavaScript.
 */
function wp_jammed_register_block() {
	// automatically load dependencies and version
	$asset_file = include( plugin_dir_path( __FILE__ ) . 'build/index.asset.php');

	wp_register_script(
		'wp-jammed',
		plugins_url( 'build/index.js', __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version']
	);

	register_block_type( 'wp-jammed/booking-block', array(
		'editor_script' => 'wp-jammed',
	) );
}

add_action( 'init', 'wp_jammed_register_block' );
