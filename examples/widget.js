(function() {
    var code = 'var cd = new CryptoDonate({\n';
    code += '  coin: "{coin}",\n';
    code += '  address: "{address}",\n';
    code += '});';

    function update() {
        var address = $('#address').val();
        var coin = $('#coin').val();

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
        };
        var keys = Object.keys(substitution);

        for (i = 0; i < keys.length; i++) {
            widgetCode = widgetCode.replace('{' + keys[i] + '}', substitution[keys[i]]);
        }

        $('#code').html(widgetCode);
    }

    $(document).ready(function() {
        $('#update').on('click', update);
        $('#form input').on('keyup', update);
        $('#form select').material_select();
        $('#form select').on('change', update)

        update();
    });
})(document);
