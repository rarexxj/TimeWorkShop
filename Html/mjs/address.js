$(function () {
    $.checkuser();
    new Vue({
        el: '#main',
        data: {
        },
        methods: {
            ajax: function () {
                $.ajax({
                    url: '/Api/v1/Member/' +$.get_user('Id'),
                    dataType:'json',
                    type: 'put',
                    data: {
                        Address: $('.address').val()
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
    })
})