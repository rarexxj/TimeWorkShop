$(function () {
    // $.ADDLOAD();
    new Vue({
        el: '#main',
        data: {
            proinfo: []

        },
        ready: function () {
            var _this = this;
            // _this.proinfoajax();
            _this.navtab();
            _this.$nextTick(function () {
            })
        },
        methods: {
            proinfoajax: function () {
                var _this = this;
                $.ajax({
                    url: '/Api/v1/Mall/Goods/List',
                    type: 'get',
                    dataType: 'json',
                    data: _this.infodata
                }).done(function (rs) {
                    if (rs.returnCode == '200') {
                        _this.proinfo = rs.data;

                        _this.$nextTick(function () {
                            $.RMLOAD();
                        })

                    }
                })
            },
            navtab:function () {
                $('#main').on('click','.nav2-box-ul li',function () {
                    $(this).addClass('active').siblings().removeClass('active');
                })
            }
        }
    })
})