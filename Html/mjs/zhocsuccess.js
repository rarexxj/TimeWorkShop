$(function () {
    // $.ADDLOAD();
    var ParentId=$.getUrlParam('id');
    new Vue({
        el: '#main',
        data: {
            info:[]

        },
        ready: function () {
            var _this = this;
            _this.ajax();
            _this.$nextTick(function () {
            })
        },
        methods: {
            ajax:function () {
                var _this=this;
                $.ajax({
                    url: '/Api/v1/ApplyInfo/Activity?id='+ParentId,
                    type: 'get',
                    dataType: 'json'
                }).done(function (rs) {
                    if (rs.returnCode == '200') {
                        _this.info = rs.data;
                        _this.$nextTick(function () {
                            $.RMLOAD();
                        })

                    }
                })

            }
        }   
    })
})