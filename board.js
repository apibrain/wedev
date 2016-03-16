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


 // 限制文本框只允许输入整数
 $(document).on('keydown', '.integer_required', function(e) {
	// Allow: backspace, delete, tab, escape and enter
	// Allow: Ctrl+A
	// Allow: home, end, left, right
	if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110]) !== -1 || (e.keyCode == 65 && e.ctrlKey === true) || (e.keyCode >= 35 && e.keyCode <= 39)) {
        // let it happen, don't do anything
    	return;
    }

    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
});
