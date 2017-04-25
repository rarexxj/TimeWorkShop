$(function () {
    $.checkuser();
    new Vue({
        el: '#main',
        data: {
        },
        methods: {
            ajax: function () {
                var reg=/^\+?[1-9][0-9]*$/;
                if(!reg.test($('.date').val())){
                    $.oppo('请输入数字',1)
                }else{
                    $.ajax({
                        url: '/Api/v1/Member/' +$.get_user('Id'),
                        dataType:'json',
                        type: 'put',
                        data: {
                            Age: $('.date').val()
                        }
                    }).done(function (rs) {
                        if (rs.returnCode == '200') {
                            $.oppo('修改成功', 1, function () {
                                window.location.replace("/Html/html/personalcenter/myinfo.html");
                            })
                        }
                    })
                }
            }

        }
    })
})