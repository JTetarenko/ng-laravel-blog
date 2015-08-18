var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Less
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
   var paths = {
        'package': '/blog',
        assets: '../../../../public/assets',
        package_assets: 'resources/assets',
        init: function() {
            this.public_package = this.assets + this.package;
            this.package_sass = this.package_assets + '/sass';
            this.package_js = this.package_assets + '/app';
            return this;
        }
    }.init();

    // compile package main sass files
    mix.sass([
        paths.package_sass + '/main.scss'
    ], paths.public_package + '/css/main.css');

    // concat and copy app scripts
    mix.scripts([
        paths.package_js + '/app.js',
        paths.package_js + '/directives.js',
        paths.package_js + '/routes.js',
        paths.package_js + '/services/*.js',
        paths.package_js + '/controllers/**/*.js'
    ], paths.public_package + '/js/app.js', paths.package_assets + '/app');
});