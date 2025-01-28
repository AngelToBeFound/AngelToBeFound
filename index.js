window.onload = function() {
	//鼠标经过更换图片
	var img = document.getElementById("img");//获取id为img
	img.onmouseover = function() {//鼠标移入id为img执行
		img.src = "images/index3.jpg"//鼠标移入更换图片
		img.onmouseout = function() {//鼠标移出执行
			img.src = "images/index2.jpg"//鼠标移出换回原来图片
		}
	}
		
	//鼠标经过放大文字
	var h1 = document.getElementById("h1");//获取id为h1
	h1.onmouseover = function() {//鼠标移入id为h1执行
		h1.style.fontSize = 30 +"px";//鼠标移入更换id为h1的字体大小为30px
		h1.onmouseout = function() {//鼠标移出执行
			h1.style.fontSize = 26 +"px";//鼠标移出更换id为h1的字体大小为24px
		}
	}
};

// 注册表单验证
function check_zhuce() {

	if (document.form1.mobile.value == "") {
		alert("请检查用户名是否为空！");
		return false;
	}else if (document.form1.psw1.value == "") {
		alert("请检查密码是否为空！");
		return false
	} else if (document.form1.psw2.value == "") {
		alert("请检查重复密码是否为空！");
		return false
	} else {
		alert("注册成功")
		location.href = "login.html"
		return false
	}
}
//登录表单验证
function check_login() {

	if (document.form1.iphone.value == "") {
		alert("请检查账号是否为空！");
		return false;
	} else if (document.form1.password.value == "") {
		alert("请检查密码是否为空！");
		return false
	} else {
		alert("登录成功")
		location.href = "index.html"
		return false
	}
}
