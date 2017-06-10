(function(){
    function update(){
        var address = $('#address').val();
        var coin = $('#coin').val();

        var cd = new CryptoDonate({
            coin: coin,
            address: address,
            baseURL: '../src/'
        });

        $('#preview').html('');
        cd.appendTo(document.getElementById('preview'));
    }

    $(document).ready(function(){
        $('#update').on('click', update);
        $('#form input').on('keyup', update);
        $('#form select').material_select();
        $('#form select').on('change', update)
    });
})(document);
