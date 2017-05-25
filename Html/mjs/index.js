$(function () {
    $.ADDLOAD();
    new Vue({
        el: '#main',
        data: {
            info: [],
            starttime:'',
            endtime:'',
            begbtn:'',
            token:''

        },
        ready: function () {
            var _this = this;
            _this.token=localStorage['qy_loginToken'];
            _this.infoajax();
            _this.$nextTick(function () {
            })
        },
        methods: {
            infoajax: function () {
                var _this = this;
                $.ajax({
                    url: '/Api/v1/Activity/New',
                    type: 'get',
                    dataType: 'json'
                }).done(function (rs) {
                    if (rs.returnCode == '200') {
                        _this.info = rs.data.Activitys[0];
                        _this.starttime=rs.data.Activitys[0].StartTime;
                        _this.endtime=rs.data.Activitys[0].EndTime;
                        // var img=[];
                        // for (i=0;i<rs.data.Activitys[0].ContentInfo.length;i++){
                        //     console.log(rs.data.Activitys[0].ContentInfo[i].RelativePath)
                        //     a=rs.data.Activitys[0].ContentInfo[i].RelativePath;
                        //     img.push(a);
                        // }
                        // for(j=0;j<img.length;j++){
                        //     var html='<img src='+img[j]+'>';
                        //     $('.ind-pro-cont').append(html);
                        // }
                        _this.$nextTick(function () {
                            _this.swipe();
                            _this.timecomp();
                            $.RMLOAD();
                        })

                    }
                })
            },

            //banner滚动
            swipe: function () {
                new Swiper('.swiper-container', {
                    direction: 'horizontal',
                    loop: true,
                    paginationClickable: true,
                    autoplay: 2500,
                    slidesPerView: 'auto',
                    centeredSlides: true,
                    grabCursor: true,
                    autoplayDisableOnInteraction: false,
                    // 如果需要分页器
                    pagination: '.swiper-pagination'
                })
            },
            timecomp:function () {
                var _this = this;
                var nowtime=new Date().getTime();
                var startime=_this.starttime;
                var endtime=_this.endtime;
                startime = startime.toString().replace(/-/g,"/");
                endtime=endtime.toString().replace(/-/g,"/");;
                starttime=new Date(startime).getTime();
                endtime=new Date(endtime).getTime();
                if(nowtime<starttime){
                    _this.begbtn=1;  //没开始
                    var time=starttime-nowtime;
                    _this.countDown(time,'.t-time2');
                    return false;
                }else if(endtime>nowtime&&nowtime>starttime){
                    _this.begbtn=2;  //开始了
                    var time=endtime-nowtime;
                    console.log(time);
                    _this.countDown(time,'.t-time1');
                    return false;
                }else if(nowtime>endtime){
                    _this.begbtn=3;  //结束了
                }
            },
            countDown: function (time, id) {
                var btn = true;
                var day_elem = $(id).find('.day');
                var hour_elem = $(id).find('.hour');
                var minute_elem = $(id).find('.mini');
                var second_elem = $(id).find('.sec');
                // var end_time = new Date(time).getTime(), //月份是实际月份-1
                //     sys_second = (end_time - new Date().getTime()) / 1000;

                var sys_second=time/1000;

                if (btn) {

                    var day = Math.floor((sys_second / 3600) / 24);
                    var hour = Math.floor((sys_second / 3600) % 24);
                    var minute = Math.floor((sys_second / 60) % 60);
                    var second = Math.floor(sys_second % 60);
                    $(day_elem).html(day <=0 ? "0" : day); //计算天
                    $(hour_elem).html(hour < 10 ? "0" + hour : hour); //计算小时
                    $(minute_elem).html(minute < 10 ? "0" + minute : minute); //计算分钟
                    $(second_elem).html(second < 10 ? "0" + second : second); //计算秒杀
                    var index = setInterval(function () {
                        if (sys_second > 0) {
                            sys_second = sys_second - 1;
                            var day = Math.floor((sys_second / 3600) / 24);
                            var hour = Math.floor((sys_second / 3600) % 24);
                            var minute = Math.floor((sys_second / 60) % 60);
                            var second = Math.floor(sys_second % 60);
                            $(day_elem).html(day <= 0 ? "0" : day); //计算小时
                            $(hour_elem).html(hour < 10 ? "0" + hour : hour); //计算小时
                            $(minute_elem).html(minute < 10 ? "0" + minute : minute); //计算分钟
                            $(second_elem).html(second < 10 ? "0" + second : second); //计算秒杀
                        } else {
                            clearInterval(index);
                            // ajaxs()
                            return; //停止下面代码执行
                        }
                    }, 1000)
                }
                btn = false;
            }

        }
    })
})