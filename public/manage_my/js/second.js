// 入口函数
$(function () {
    // 声明一个变量记录页数
    var myPage = 1;
    // 声明一个变量记录显示条数
    var myPageSize = 5;
    // 声明一个函数
    function getData() {
        // 二级分类查询
        $.ajax({
            // 地址
            url: "/category/querySecondCategoryPaging",
            // 参数
            data: {
                page: myPage,
                pageSize: myPageSize,
            },
            success: function (backData) {
                // console.log(backData)
                // 添加进入到 tbody
                $("tbody").html(template("second-tmp", backData));
                // 制作分页
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: myPage, //当前页
                    totalPages: Math.ceil(backData.total/myPageSize), //总页数
                    size: "small", //设置控件的大小，mini, small, normal,large
                    onPageClicked: function (event, originalEvent, type, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        myPage = page;
                        getData();
                    }
                });
            }
        })
    }

    // 默认调用一次
    getData();


})