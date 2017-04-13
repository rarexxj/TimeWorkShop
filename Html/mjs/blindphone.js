$(function () {
    $.checkuser();
    $.RMLOAD();
    var id = $.get_user('Id')   //身份id
    $('.get').on('click', function () {

        if ($('#nph').val() == "") {
            $.oppo("请输入手机号", 1);
            return false;
        } else if ($('#yzm').val() == "") {
            $.oppo("请输入验证码", 1);
            return false;
        } else {
            $(this).addClass('on');
            var data = {
                PhoneNumber: $('#nph').val(),
                RequestType: '2'
            }
            ajax2(data)
        }

    })
    function ajax2(data) {
        $.ajax({
            url: '/Api/v1/Member/SendCodeWeixin',
            dataType: 'json',
            type: 'post',
            data: data
        }).done(function (rs) {
            if (rs.returnCode == '200') {
                $.oppo('验证码已发送', 1)
                CountDown($('.get'));
            }
        }).always(function () {
            $('.get').removeClass('on')
        })
    }
})