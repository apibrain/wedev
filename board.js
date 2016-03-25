/**
 * Javascript 常用函数
 */

/*******************************************************
                        检测 & 正则表达式
 *******************************************************/

 /**
  * 测试指定字符串是否是邮箱地址
  * @param  {string}  str 给定的字符串
  * @return {boolean}
  */
function is_email(str) {
    var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(str);
}

/**
 * 测试指定的字符串是否是合法的URL
 * @param  {string}  str 给定的字符串
 * @return {boolean}
 */
function is_url(str) {
    var reg = /\b(https?):\/\/[\-A-Za-z0-9+&@#\/%?=~_|!:,.;]*[\-A-Za-z0-9+&@#\/%=~_|‌​]/;
    return reg.test(str);
}

/**
 * 判断给定的对象是否是数字
 * @param  {object}  num 要判断的对象
 * @return {boolean}     num是数字，返回true，否则返回false
 */
function is_numeric(num) {
    return !isNaN(parseFloat(num)) && isFinite(num);
}

/**
 * 测试指定的字符串是否包含中文
 * @param  {string} str 给定的被测试的字符串
 * @return {boolean}
 */
function contains_chinese(str) {
    var reg = /[\u4E00-\u9FA5]/;
    return reg.test(str);
}


/*******************************************************
                     一些常用方法
 *******************************************************/
/**
 * 获取一个指定范围内的随机数
 * @param  {int} min 最小数值
 * @param  {int} max 最大数值
 * @return {int}     min 和 max 之间的随机数
 *
 */
function get_random_number(min, max) {
    // 如果最小值等于最大值，则直接返回最小值
    if (min == max) {
        return min;
    }

    // 如果最小值大于最大值，则返回false
    if (min > max) {
        return false;
    }

    var range = max - min;
    var random = Math.random();
    return min + Math.round(random * range);
}

/**
 * 获取一个指定长度的有数字和小写字母组成的随机字符串（最多支持16位长度）
 * @param  {int} length 要获取的随机字符串长度
 * @return {string}        指定长度的随机字符串
 */
function get_random_string(length) {
    if (length < 1 || length > 16) {
        throw new Error('长度范围只能是1-16之间');
    }
    return Math.random().toString(36).substr(2, length);
}

/**
 * 获取一个五分制的评分
 * @param  {int} rating 评分值
 * @return {string}     对应评分的五星字符
 */
function get_rating(rating) {
    if (rating > 5 || rating < 0) {
        throw new Error('数字不在0-5范围内');
    }

    var star = '★★★★★☆☆☆☆☆';

    return star.substring(5 - rating, 10 - rating);
}

/**
 * 对给定的HTML字符串进行转义。如把 > 转义成 &gt;
 * @param  {string} s 要转义的HTML字符串
 * @return {string}   转义后的HTML字符串
 */
function escape_html(s) {
    return new Option(s).innerHTML;
}

/**
 * 获取一个随机的十六进制颜色字符串
 * @param  {bool} with_sharp 是否带井号(#)
 * @return {string}          十六进制颜色
 */
function get_random_color(with_sharp) {
    var hex_color = (~~(Math.random()*(1<<24))).toString(16);
    return (with_sharp ? '#' : '') + hex_color.pad_left(0, 6);
}

/**
 * 获取指定url的查询参数值
 * @param  {string} name 要查询的参数名
 * @param  {string} url  要查询的url
 * @return {string}      查询参数的值
 */
function get_query_string(name, url) {
    if (!url) {
        url = window.location.href;
    }

    // 把url转换成小写
    url = url.toLowerCase();

    name = name.replace(/[\[\]]/g, "\\$&").toLowerCase();

    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
    var results = regex.exec(url);

    if (!results) {
        return null;
    }

    if (!results[2]) {
        return '';
    }

    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/*******************************************************
                 对象、字符串、数字、数组扩展
 *******************************************************/
 /**
  * 重复N次字符串
  * @param  {int} times 要重复输出的次数
  * @return {string}       重复N次后的字符串
  */
String.prototype.repeat = function(times) {
    times = parseInt(times);
    return Array(times + 1).join(this);
}

String.prototype.toTitleCase = function() {
    // todo...
}

/**
 * 用给定的字符左补齐字符串到指定的长度
 * @param  {string} char   用于补齐的字符
 * @param  {int} length 要补齐的长度
 * @return {string}        补齐后的字符串
 */
Object.prototype.pad_left = function(char, length) {
    var _this = (this instanceof String) ? this : this.toString();
    var current_length = _this.length;
    if (length <= current_length) {
        return _this;
    }

    return (Array(length).join(char) + _this).substr(-length);
}

/**
 * 格式化字符串
 * @return {string} 格式化之后的字符串
 */
String.prototype.format = function() {
    var args = arguments;

    return this.replace(/{(\d+)}/g, function(match, number) {
        return typeof args[number] != 'undefined' ? args[number] : match;
    });
}

/**
 * 删除数组中给定的元素
 * @param  {object} item 要删除的元素
 * @return {array}      删除之后的数组
 */
Array.prototype.remove = function(item) {
    // Array是否支持indexOf方法
    if (Array.indexOf != 'undefined') {
        var i = this.indexOf(item);
        if (i > -1) {
            this.splice(i, 1);
        }
    } else {
        for (var i = this.length - 1; i >= 0; i--) {
            if (this[i] == item) {
                this.splice(i, 1);
                break;
            }
        }
    }
}

/*******************************************************
                    结合 jQuery 操作
 *******************************************************/
var $ = window.jQuery;
/**
 * 限制文本框只允许输入整数
 */
$(document).on('keydown', '.integer_required', function(e) {
    // Allow: backspace, delete, tab, escape and enter
    // Allow: Ctrl+A
    // Allow: home, end, left, right
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 ||
        (e.keyCode == 65 && e.ctrlKey === true) ||
        (e.keyCode >= 35 && e.keyCode <= 39)) {
        // let it happen, don't do anything
    	return;
    }

    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});

/**
 * 按回车提交（或执行其他方法）
 */
$('#input').keyup(function(e) {
    if (e.keyCode == '13') {
        $('form').submit();
        // or do something...
    }
});

/**
 * 判断是否存在给定的对象
 * @return {int} 存在，返回true；不存在，返回false
 * @usage if ($(selector).exists()) { ... }
 */
jQuery.fn.exists = function() {
    return this.length > 0;
}


/*******************************************************
                    一些 js 技巧
 *******************************************************/
/**
 * 模拟 HTTP Redirect 和 链接点击
 * 来源：http://stackoverflow.com/questions/503093/how-can-i-make-a-page-redirect-using-jquery
 */
window.location.replace("http://www.newdomain.com");  // HTTP Redirect
window.location.href = "http://www.newdomain.com";  // 链接点击
