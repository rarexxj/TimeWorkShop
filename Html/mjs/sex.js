$(function () {
    $.ADDLOAD()
    $.checkuser();
    new Vue({
        el: '#main',
        data: {
            choose : '',
            info: [],
            sex: [
                {
                    name: '男',
                    active:1
                },
                {
                    name: '女',
                    active:2
                }
            ]
        },
        ready: function () {
            var _this = this;
            _this.$nextTick(function () {
                $.RMLOAD();
            })
        },
        methods: {
            infoajax: function () {
                var _this = this;
                $.ajax({
                    url: '/Api/v1/Member/' + $.get_user('Id'),
                    type: 'put',
                    data: {
                        Sex: _this.choose
                    }
                }).done(function (rs) {
                    if (rs.returnCode == '200') {
                        $.oppo('修改成功', 1, function () {
                            window.location.replace("/Html/html/personalcenter/myinfo.html");
                        });
                    }
                })
            },
            chooseAction:function(id){
                this.choose = id;
            }
        }
    })
})
