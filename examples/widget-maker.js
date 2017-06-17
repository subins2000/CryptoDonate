(function() {
    function SelectText(text) {
        var doc = document,
            range, selection;
        if (doc.body.createTextRange) {
            range = document.body.createTextRange();
            range.moveToElementText(text);
            range.select();
        } else if (window.getSelection) {
            selection = window.getSelection();
            range = document.createRange();
            range.selectNodeContents(text);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }

    var code = '&lt;div id="{cdID}"&gt;&lt;/div&gt;\n';
    code += '&lt;script&gt;\n';
    code += '  !function(c){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.onload=c,t.src="//lab.subinsb.com/projects/francium/cryptodonate/widget.js";var e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(t,e)}(function(){\n';
    code += '    Fr.loadCD("{cdID}", {\n';
    code += '      coin: "{coin}",\n';
    code += '      address: "{address}",\n';
    code += '      buttonClass: "{classes}",\n';
    code += '      dialogClass: "{classes}",\n';
    code += '    });\n';
    code += '  });\n';
    code += '&lt;/script&gt;';

    function update() {
        var address = $('#address').val();
        var coin = $('#coin').val();
        var classes = ($('#size').val() + ' ' + $('#theme').val()).trim();
        var cdID = 'cd' + Math.round(Math.random() * 1000);

        var cd = new Fr.CryptoDonate({
            coin: coin,
            address: address,
            buttonClass: classes,
            dialogClass: classes
        });

        $('#btn-preview').html('');
        cd.appendTo(document.getElementById('btn-preview'));

        var widgetCode = code;
        var substitution = {
            coin: coin,
            address: address,
            classes: classes,
            cdID: cdID
        };
        var keys = Object.keys(substitution);

        for (i = 0; i < keys.length; i++) {
            widgetCode = widgetCode.replace(new RegExp('{' + keys[i] + '}', 'g'), substitution[keys[i]]);
        }

        $('#code').html(widgetCode);
    }

    $(document).ready(function() {
        $('#update').on('click', update);
        $('#form input').on('keyup', update);
        $('#form select').on('change', update);

        $('#code').click(function() {
            SelectText(this);
        });

        update();
    });
})(document);
