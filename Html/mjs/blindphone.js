$(function () {
    $.checkuser();
    $.RMLOAD();
    var id = $.get_user('Id')   //身份id
    $('.get').on('click', function () {
        if ($('#oph').val() == "") {
            $.oppo("请输入旧手机号", 1);
            return false;
        } else {
            $(this).addClass('on');
            var data = {
                PhoneNumber: $('#oph').val(),
                RequestType: '2'
            }
            ajax(data)
        }

    })

    $('.get2').on('click', function () {
        if ($('#nph').val() == "") {
            $.oppo("请输入新手机号", 1);
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
    function ajax(data) {
        $.ajax({
            url: '/Api/v1/Member/SendCode',
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
    function ajax2(data) {
        $.ajax({
            url: '/Api/v1/Member/SendCode',
            dataType: 'json',
            type: 'post',
            data: data
        }).done(function (rs) {
            if (rs.returnCode == '200') {
                $.oppo('验证码已发送', 1)
                CountDown($('.get2'));
            }
        }).always(function () {
            $('.get2').removeClass('on')
        })
    }

    $('.submit').on('click',function () {
        if ($('#oph').val() == "") {
            $.oppo("请输入旧手机号", 1);
            return false;
        } else if ($('#oyzm').val() == "") {
            $.oppo("请输入验证码", 1);
            return false;
        } else if ($('#yzm').val() == "") {
            $.oppo("请输入验证码", 1);
            return false;
        } else if ($('#nph').val() == "") {
            $.oppo("请输入新手机号", 1);
            return false;
        } else {
            var data = {
                PhoneNumber: $('#oph').val(),
                SmsVerifyCode: $('#oyzm').val(),
                NewPhoneNumber: $('#nph').val(),
                NewSmsVerifyCode: $('#yzm').val()
            }
            ajax3(data)
        }
    })

    function ajax3(data) {
        $.ajax({
            url: '/Api/v1/Member/' + id + '/PhoneNumber',
            dataType:'json',
            type: 'patch',
            data: data
        }).done(function (rs) {
            if (rs.returnCode == '200') {
                $.oppo('修改成功', 1);
                setTimeout(function () {
                    window.location.href = "/Html/html/personalcenter/myinfo.html";
                }, 1000)
            }
        }).always(function () {
            $('.submit').removeClass('gray')
        })

    }
})