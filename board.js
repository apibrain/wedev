/**
 * Javascript 常用函数
 */
 
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
