// 入口函数
$(function () {
    // 声明一个变量代表页数
    var myPage = 1;
    // 声明一个变量代表显示几条
    var myPageSize = 5;
    // 声明一个函数
    function getData() {
        // 进来就加载
        $.ajax({
            // 地址
            url: "/category/queryTopCategoryPaging",
            // 参数
            data: {
                // 页数
                page: myPage,
                // 显示几条
                pageSize: myPageSize,
            },
            success: function (backData) {
                console.log(backData)
                // 添加数据
                $("tbody").html(template("first-tmp", backData));
                // 分页
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage: myPage, //当前页
                    totalPages: Math.ceil(backData.total / myPageSize), //总页数
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

    // 给 form 添加验证
    $("form").bootstrapValidator({
        //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
        excluded: [':disabled', ':hidden', ':not(:visible)'],

        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //3. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            categoryName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '添加内容不能为空'
                    },
                }
            },
        }

    }).on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            // 地址
            url:"/category/addTopCategory",
            // 参数
            data:$("form").serialize(),
            // 请求方式
            type:"post",
            success:function(data){
                // console.log(data)
                // 关闭掉 模态栏
                $('#modal-add').modal("hide")
                getData();
            }
        })
    });
})