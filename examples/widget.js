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

    var code = 'var cd = new CryptoDonate({\n';
    code += '  coin: "{coin}",\n';
    code += '  address: "{address}",\n';
    code += '  buttonClass: "{theme}",\n';
    code += '  dialogClass: "{theme}",\n';
    code += '});';

    function update() {
        var address = $('#address').val();
        var coin = $('#coin').val();
        var theme = $('#theme').val();

        var cd = new CryptoDonate({
            coin: coin,
            address: address,
            baseURL: '../src/'
        });

        $('#btn-preview').html('');
        cd.appendTo(document.getElementById('btn-preview'));

        var widgetCode = code;
        var substitution = {
            coin: coin,
            address: address,
            theme: theme
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
        $('#form select').material_select();
        $('#form select').on('change', update);

        $('#code').click(function() {
            SelectText(this);
        });

        update();
    });
})(document);
