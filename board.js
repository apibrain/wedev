/**
 * Javascript 常用函数
 */

/*******************************************************
                        正则表达式
 *******************************************************/

 /**
  * 测试指定字符串是否是邮箱地址
  * @param  {string}  str 给定的字符串
  * @return {boolean}
  */
function is_email(str) {
    var reg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
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

/*******************************************************
                    结合 jQuery 操作
 *******************************************************/
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