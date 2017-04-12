$(function () {
    // $.ADDLOAD();
    new Vue({
        el: '#main',
        data: {
            proinfo: [],
            infodata: {
                wordKey: '',
                goodsCategory: 1,
                pageNo: 1,
                limit: 10
            }

        },
        ready: function () {
            var _this = this;
            // _this.proinfoajax();
            _this.layclose();
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
            layclose:function () {
                $('#main').on('click','.layer',function () {
                    $(this).hide();
                })
                $('#main').on('click','.layer-xx',function () {
                    $(this).hide();
                })
                $('#main').on('click','.lay-close',function () {
                    $('.layer').show();
                })
                $('#main').on('click','.per-xx',function () {
                    $('.layer-xx').show();
                })
            }
        }
    })
})