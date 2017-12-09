// 入口函数
$(function () {
    // 声明一个变量来表示页码
    var myPage = 1;
    // 声明一个变量用来显示几条数据
    var myPageSize = 5;
    // 封装
    function getData() {
        // 一开始就添加
        $.ajax({
            // 地址
            url: "/user/queryUser",
            // 传入的参数
            data: {
                // 页码
                page: myPage,
                // 显示几条数据
                pageSize: myPageSize
            },
            success: function (backData) {
                // console.log(backData)
                // 添加到 tbody
                $("tbody").html(template("user-tmp", backData))

                // 分页插件
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: myPage, //当前页
                    totalPages: Math.ceil(backData.total/myPageSize), //总页数
                    size: "small", //设置控件的大小，mini, small, normal,large
                    onPageClicked: function (event, originalEvent, type, page) {
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        // 重新赋值当前页
                        myPage = page;
                        // 点击过后重新调用
                        getData();
                    }
                });

            }
        })
    }
    // 默认调用一次
    getData();


    // 给 禁用 启用 添加点击事件
    $("tbody").on("click","button",function(){
        // console.log(123)
        // 声明变量
        var id = $(this).parent().attr("data-id");
        // console.log(id);
        var myIsDelete = undefined;
        // 判断
        if($(this).html() == "启用"){
            myIsDelete = 0;
        }else{
            myIsDelete = 1;
        }
        $.ajax({
            // 地址
            url:"/user/updateUser",
            // 参数
            data:{
                id:id,
                isDelete:myIsDelete
            },
            // 请求方式
            type:"post",
            success:function(backData){
                getData();
                console.log(backData)
            }
        })
    })
})