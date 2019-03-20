
var originalPrice = 0;//总价
var actualPrice = 0;
var num = 1;//根据创建顺序记录用户序号
var userInfo = [];//用户信息数据

function $(id) {
    return document.getElementById(id);
}

function displayInfo(obj,value) {
    $(obj.id).innerHTML = value;
    $(obj.id).style.fontSize = "20px";
    $(obj.id).style.color = "#000";
}
//修改显示的默认值

function checkInput(value) {
    if (!value && typeof(value)!="undefined" && value!=0){}//判断是否为Null
    else{
        var reg = /^\s*(\S+)\s*$/;//判断空格
        if(reg.test(value)){
            return true;
        }
    
        else{
            alert("兄dei,请不要留空～");
        }
    }
}
//检查输入内容

function updatePrice() {
    var sum=0;
    for(let i=0;i<userInfo.length;i++){
/*        console.info("userInfo[",i,"].cost:",userInfo[i].cost);*/
        if(userInfo[i] != null && userInfo[i].cost != null) {sum += userInfo[i].cost;}
        else{sum+=0;}
        //判断是否是第一次输入或者空值，不是则将当前输入值sum与之前的所有cost相加
        console.log("sum:",sum);
    }
    originalPrice = sum;//计入总价
    $("money_container_original_price").innerHTML = originalPrice;//总价表
    $("money_container_original_price").style.fontSize = "20px";
    $("money_container_original_price").style.color = "#000";

    $("actual_price").innerHTML = actualPrice;
    $("result_original_price").innerHTML = "商品总价"+originalPrice+"元";
}
//更新总价

function getInfo(obj) {
    var str = obj.id;
    var key = parseInt(str.charAt(str.length-1));//获取点击位置的用户序号
    var oldInfo = {};
    var addInfo = {};
   /* console.log("userInfo[",key-1,"]",":",userInfo[key-1]);*/
    oldInfo = userInfo[key-1];
    console.log("oldInfo",":",oldInfo);
    if (str.indexOf("user") > -1){
        if(str.indexOf("name") > -1){
            var value = prompt("谁买了奶茶", "");
            console.log("value:",value);
            if (checkInput(value)){
                addInfo.name = value;
                addInfo.id = str;//记录卡片id
                displayInfo(obj,value);

            }
        }
            else {

                var value = prompt("请输入金额", "");
                if(checkInput(value)){
                    value = parseInt(value);
                    addInfo.cost = value;//记录卡片id
                    console.log("addInfo.cost:",addInfo.cost);
                    displayInfo(obj,value);
                }
            }
        if (!oldInfo){
            userInfo[key-1] = Object.assign(addInfo,oldInfo);
            userInfo[key-1].id = str;
        }//Object(target,source)中target不能为NULL或undefined
            else {
                userInfo[key-1] = Object.assign(oldInfo,addInfo);

                /*console.log("userInfo[",key-1,"]",":",userInfo[key-1]);*/
            }
            //用户增加/修改卡片内容时，更新用户信息
        updatePrice();
        }
    else  {
            var value = (prompt("请输入金额", ""));
            if(checkInput(value)){
                actualPrice = value;
                displayInfo(obj,value);
            }
        }
}
//获取输入信息

function addPeople() {
    num = num + 1;
    var div = $("user");
    var text1 = document.createElement("div");
        text1.setAttribute("class","text");
        text1.innerHTML="谁买了奶茶";
        text1.id = "user_container_name_"+num.toString();
        text1.onclick = function () {
        getInfo(this);
    }

    var text2 = document.createElement("div");
        text2.setAttribute("class","text");
        text2.innerHTML="买了多少钱";
        text2.id = "user_container_price_"+num.toString();
        text2.onclick = function () {
            getInfo(this);
        }


    var nodeCard = document.createElement("div");
        nodeCard.setAttribute("class","container_card");
        var nodeLeft = document.createElement("div");
            nodeLeft.setAttribute("class","card_left");
            nodeCard.appendChild(nodeLeft);
            nodeLeft.appendChild(text1)

        var line = document.createElement("line");
            line.setAttribute("class","line");
            nodeCard.appendChild(line);

        var nodeRight = document.createElement("div");
            nodeRight.setAttribute("class","card_right");
            nodeCard.appendChild(nodeRight);
            nodeRight.appendChild(text2);

        var del = document.createElement("div");
            del.setAttribute("class","delBtn");
            del.id = "user_container_del_"+num.toString();
            del.onclick = function(){
                delUser(this);
            }
            nodeCard.appendChild(del);
    div.appendChild(nodeCard);
}
//控制dom
function delUser(obj) {
    var str = obj.id;
    var key = parseInt(str.charAt(str.length - 1));
    userInfo.splice(key-1,1);
    updatePrice();//内部将遍历之前所有cost更新总价

        if(str.indexOf("result") > -1) {
            for (let i = 0; i < userInfo.length; i++) {
                var actualCost = new Number(userInfo[i].cost / originalPrice * actualPrice);
                $(userInfo[i].id + "_result_user_" + (i + 1)).innerHTML = userInfo[i].name + "应付" + actualCost.toFixed(1) + "元";
                //修改人物应付金额
            }
        }
        var child = $(str);
        child.parentNode.parentNode.removeChild(child.parentNode);

}
//删除用户


function result() {
    if (actualPrice == 0) {
        alert("亲，实际付款金额还没填呢！");
    }
        else{
                if (checkNull()) {alert("用户没填完全哦！");}
                        else {
                    $("popUp").style.display = "block";
                    $("mask").style.display = "block";
                    $("body").setAttribute("class", "body");
                    $("actual_price").innerHTML = actualPrice;
                    $("result_original_price").innerHTML = "商品总价" + originalPrice + "元";
                }
                    for (let i = 0; i < userInfo.length; i++) {
                        var actualCost = new Number(userInfo[i].cost/ originalPrice * actualPrice);//为使用toFixed保留字符串
                        billList(userInfo[i],actualCost.toFixed(1),i+1);
                    }
                            }
    }

//结果页
function billList(user,cost,num) {
    var parent = $("bill");
    var billList = document.createElement("div");
    parent.appendChild(billList);
    billList.setAttribute("id","bill_list");
        var childInfo = document.createElement("div");
        billList.appendChild(childInfo);
        childInfo.setAttribute("class","child_info");

            var childUser = document.createElement("div");
            childInfo.appendChild(childUser);
            childUser.innerHTML = user.name+"应付"+cost+"元";
            childUser.setAttribute("class","child_user");
            childUser.id = user.id+"_result_user_"+num;
            console.log("childUser.id:"+childUser.id);

            var childOri = document.createElement("div");
            childInfo.appendChild(childOri);
            childOri.innerHTML = "商品原价"+user.cost+"元";
            childOri.setAttribute("class","child_Ori");

        var childTransh = document.createElement("img");
        billList.appendChild(childTransh);
        childTransh.src="img/Transh.png";
        childTransh.setAttribute("class","child_trash");

        childTransh.id = user.id+"_result_transh_"+num;
        childTransh.onclick = function(){
            delUser(this);
        }

}

function checkNull() {
    for(let i = 0;i<userInfo.length;i++) {
        if (userInfo[i].cost == null || userInfo[i].name == null) {return true;}
        else{return false;}
    }
}
//遍历所有已存在的属性，判断是否为空；

function backToHome() {
    $("popUp").style.display = "none";
    $("mask").style.display = "none";
}