jQuery(function ($) {
    $('#ActivityTypeTable').dataTable({
        "processing": true,
        "serverSide": true,
        "sorting": [[3, "desc"]],
        "ajax": url_loadPage,
        "aoColumns":
        [
            { "mData": "RealName", 'sClass': 'left', "orderable": false },
            { "mData": "PhoneNumber", 'sClass': 'left', "orderable": false },
            {
                "mData": "ApplyTime", 'sClass': 'left', "mRender": function (data, type, full) {
                    if (data != null && data.length > 0) {
                        return eval('new ' + data.replace(/\//g, '')).Format("yyyy-MM-dd hh:mm");
                    }
                    return "";
                }
            },
            {
                "mData": "PayStatus", 'sClass': 'left', "orderable": false, "mRender": function (data, type, full) {
                    switch (full.PayStatus) {
                        case "1":
                            return "支付中";
                            break;
                        case "2":
                            return "已支付";
                            break;
                        default:
                            return "未付款";
                            break;
                    }
                }
            },
            {
                "mData": "Status", 'sClass': 'left', "orderable": false, "mRender": function (data, type, full) {
                    switch (full.Status) {
                        case "1":
                            return "已集齐";
                            break;
                        case "2":
                            return "已补齐";
                            break;
                        default:
                            return "未集齐";
                            break;
                    }
                }
            },
            { "mData": "RedeemCode", 'sClass': 'left', "orderable": false },
            {
                "mData": "PrizeStatus", 'sClass': 'left', "orderable": false, "mRender": function (data, type, full) {
                    if (full.PrizeStatus == "1") {
                        return "已兑奖";
                    } else {
                        return "未兑奖";
                    }
                }
            }
        ]
    });
});