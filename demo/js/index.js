/**
 * Created by jesse on 2018/2/6.
 */
new Vue
({
    el: '#app',
    data:
    {
        page: 1,
        type: 0,
        info: []
    },
    filters:
    {
        format: function (value)
        {
            var capitalArr = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十'];
            return '第' + capitalArr[value - 1] + '轮';
        }
    },
    created: function ()
    {
        var _this = this;
        this.getData();

        window.onscroll = function ()
        {
            //真实内容的高度
            var pageHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight);
            //视窗的高度
            var viewportHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
            //隐藏的高度
            var scrollHeight = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            //判断是否到达底部
            if(pageHeight - viewportHeight - scrollHeight <=0)
            {
                _this.page++;
                _this.getData();
            }
        }
    },
    methods:
    {
        getData: function ()
        {
            var _this = this;
            axios.post('./data.json',
            {
                page: this.page,
                type: this.type
            })
            .then(function(res)
            {
                if (res.data.info.page.page < _this.page)
                {
                    var goods = _this.info.activityList.concat(res.data.info.activityList);
                    _this.info.activityList = goods;
                }
                else
                {
                    _this.info = res.data.info;
                }
                _this.page = res.data.info.page.page;
            })
        },
        getType: function (type)
        {
            if (this.type == type) return false;
            this.type = type;
            this.getData();
        }
    }
})