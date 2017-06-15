(function() {
    var rootURL = '//lab.subinsb.com/projects/francium/cryptodonate/';
    window.Fr = window.Fr || {};

    Fr.loadCD = function(target, options) {
        if (typeof target === 'string') {
            target = document.getElementById(target);
        }

        function loadCSS(file) {
            var cssElem = document.createElement('link');
            cssElem.rel = 'stylesheet'
            cssElem.href = rootURL + '/css/' + file;

            cssElem.id = 'loadCD-css';
            document.head.appendChild(cssElem);
        }

        /**
         * Load CryptoDonate asynchornously
         */
        if (!document.getElementById('loadCD-css')) {
            loadCSS('cryptodonate.css');

            if (options.buttonClass !== undefined && options.buttonClass.match('dark')) {
                loadCSS('cryptodonate.dark.css')
            }
        }

        (function(c) {
            if (Fr.CryptoDonate === undefined) {
                var t = document.createElement("script");
                t.type = "text/javascript",
                    t.async = true,
                    t.onload = c,
                    t.src = rootURL + "cryptodonate.js";
                var e = document.getElementsByTagName("script")[0];
                e.parentNode.insertBefore(t, e);
            } else {
                c();
            }
        })(function() {
            new Fr.CryptoDonate(options).appendTo(target);
        });
    };
})();
