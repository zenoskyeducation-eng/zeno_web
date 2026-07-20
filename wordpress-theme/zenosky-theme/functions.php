<?php
/**
 * Zeno-Sky Theme Functions and Enqueues
 */

function zenosky_theme_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array('search-form', 'comment-form', 'comment-list', 'gallery', 'caption'));
}
add_action('after_setup_theme', 'zenosky_theme_setup');

function zenosky_enqueue_assets() {
    $theme_dir = get_template_directory();
    $theme_uri = get_template_directory_uri();
    
    // Auto-detect built CSS bundle in assets
    $css_files = glob($theme_dir . '/assets/*.css');
    if (!empty($css_files)) {
        $css_filename = basename($css_files[0]);
        wp_enqueue_style('zenosky-app-css', $theme_uri . '/assets/' . $css_filename, array(), '1.0.0');
    }
    
    // Auto-detect built JS bundle in assets
    $js_files = glob($theme_dir . '/assets/*.js');
    if (!empty($js_files)) {
        $js_filename = basename($js_files[0]);
        wp_enqueue_script('zenosky-app-js', $theme_uri . '/assets/' . $js_filename, array(), '1.0.0', true);
    }
}
add_action('wp_enqueue_scripts', 'zenosky_enqueue_assets');
