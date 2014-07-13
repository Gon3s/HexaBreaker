<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="description" content="A front-end template that helps you build fast, modern mobile web apps.">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>HexaBreaker</title>

    <!-- Add to homescreen for Chrome on Android -->
    <meta name="mobile-web-app-capable" content="yes">
    <link rel="icon" sizes="196x196" href="images/touch/chrome-touch-icon-196x196.png">

    <!-- Add to homescreen for Safari on iOS -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="apple-mobile-web-app-title" content="Web Starter Kit">

    <!-- Tile icon for Win8 (144x144 + tile color) -->
    <meta name="msapplication-TileImage" content="images/touch/ms-touch-icon-144x144-precomposed.png">
    <meta name="msapplication-TileColor" content="#3372DF">

    <!-- SEO: If your mobile URL is different from the desktop URL, add a canonical link to the desktop page https://developers.google.com/webmasters/smartphone-sites/feature-phones -->
    <!--
    <link rel="canonical" href="http://www.example.com/">
    -->

    <!-- build:css styles/components/main.min.css -->
    <link rel="stylesheet" href="styles/h5bp.css">
    <link rel="stylesheet" href="styles/components/components.css">
    <link rel="stylesheet" href="styles/main.css">
    <!-- endbuild -->

    <!-- Google Fonts -->
    <link rel='stylesheet' href='http://fonts.googleapis.com/css?family=Roboto+Condensed:400,300,700'>
  </head>
  <body>
    <header class="app-bar promote-layer">
      <div class="app-bar-container">
        <button class="menu"><img src="images/hamburger.svg" alt="Menu"></button>
        <h1 class="logo">HexaBreaker</h1>
        <section class="app-bar-actions">
        <!-- Put App Bar Buttons Here -->
        </section>
      </div>
    </header>

    <!-- <nav class="navdrawer-container promote-layer">
      <h4>Navigation</h4>
      <ul>
        <li><a href="#hello">Hello</a></li>
        <li><a href="#get-started">Get Started</a></li>
        <li><a href="styleguide/index.html">Style Guide</a></li>
      </ul>
    </nav> -->

    <main>
      <canvas id="grid"></canvas>
    </main>

    <!-- build:js scripts/main.min.js -->
    <script src="scripts/game_manager.js"></script>
    <script src="scripts/grid.js"></script>
    <script src="scripts/tile.js"></script>
    <script src="scripts/html_actuator.js"></script>
    <script src="scripts/main.js"></script>
    <!-- endbuild -->

    <!-- Google Analytics: change UA-XXXXX-X to be your site's ID -->
    <script>
      // (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      // (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      // m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      // })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
      // ga('create', 'UA-XXXXX-X');
      // ga('send', 'pageview');
    </script>
    <!-- Built with love using Web Starter Kit -->
  </body>
</html>
