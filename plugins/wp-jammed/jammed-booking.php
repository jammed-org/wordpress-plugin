<?php
/**
 * Plugin Name: Jammed Booking Widget
 * Plugin URI: https://jammed.app
 * Description: Easily add the Jammed booking widget to your WordPress site.
 * Version: 1.0.0
 * Author: Jammed Booking Ltd
 * Author URI: https://jammed.app
 * License: MIT
 * License URI: https://opensource.org/licenses/MIT
 * Text Domain: jammed-booking
 */


 if (!defined('ABSPATH')) {
  exit; // Exit if accessed directly
}

class Jammed_Booking_Widget {
  public function __construct() {
      add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
      add_action('admin_init', array($this, 'register_settings'));
      add_action('admin_menu', array($this, 'add_settings_section'));
      add_action('init', array($this, 'register_gutenberg_block'));
      add_shortcode('jammed_booking', array($this, 'jammed_booking_shortcode'));
  }

  public function enqueue_scripts() {
      wp_enqueue_script('jammed-bookings', 'https://mini.jammedapp.com/jammed-bookings.min.js', array(), '1.0.0', true);
      if (is_admin()) {
          wp_enqueue_script('jammed-bookings-admin', 'https://mini.jammedapp.com/jammed-bookings.min.js', array(), '1.0.0', true);
      }
  }

  public function register_settings() {
      register_setting('general', 'jammed_account_subdomain', array(
          'type' => 'string',
          'show_in_rest' => true,
          'sanitize_callback' => 'sanitize_text_field',
      ));
  }

  public function add_settings_section() {
      add_settings_section(
          'jammed_booking_settings',
          'Jammed Booking Settings',
          array($this, 'settings_section_callback'),
          'general'
      );

      add_settings_field(
          'jammed_account_subdomain',
          'Jammed Account Subdomain',
          array($this, 'account_subdomain_callback'),
          'general',
          'jammed_booking_settings'
      );
  }

  public function settings_section_callback() {
      echo '<p>Enter your Jammed account subdomain below:</p>';
  }

  public function account_subdomain_callback() {
      $subdomain = get_option('jammed_account_subdomain');
      echo "<input type='text' name='jammed_account_subdomain' value='$subdomain' />";
  }

  public function register_gutenberg_block() {
      if (!function_exists('register_block_type')) {
          return;
      }

      wp_register_script(
          'jammed-booking-block-editor',
          plugins_url('build/index.js', __FILE__),
          array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-api-fetch'),
          filemtime(plugin_dir_path(__FILE__) . 'build/index.js')
      );

      register_block_type('jammed-booking/widget', array(
          'editor_script' => 'jammed-booking-block-editor',
          'render_callback' => array($this, 'render_booking_widget'),
          'attributes' => array(
              'account' => array(
                  'type' => 'string',
                  'default' => '',
              ),
          ),
      ));
  }

  public function render_booking_widget($attributes) {
      $subdomain = isset($attributes['account']) ? $attributes['account'] : get_option('jammed_account_subdomain');
      return "<jammed-bookings account=\"$subdomain\"></jammed-bookings>";
  }

  public function jammed_booking_shortcode($atts) {
      $attributes = shortcode_atts(array(
          'account' => get_option('jammed_account_subdomain'),
      ), $atts);
      return $this->render_booking_widget($attributes);
  }
}

new Jammed_Booking_Widget();
