document.body.ontouchstart = function(sss){
    sss.preventDefault()
}
var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');
var lineWidth = 5

autoCanvasSize(yyy)

listenToUser(yyy)

var eraserEnable = false
eraser.onclick = function(){    //这里就是实现点击画笔的时候橡皮檫就熄灭，橡皮檫点击的时候画笔熄灭
    eraserEnable = true
    eraser.classList.add('active')
    bush.classList.remove('active')
}
bush.onclick = function(){
    eraserEnable = false
    bush.classList.add('active')
    eraser.classList.remove('active')
}
black.onclick = function(){
    context.fillStyle = 'black'
    context.strokeStyle = 'black'
    black.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.remove('active')
}
red.onclick =function(){        //这里也有点击的功能吗，这样都行
    context.fillStyle = 'red'
    context.strokeStyle = 'red'
    black.classList.remove('active')
    red.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')
}
green.onclick =function(){
    context.fillStyle = 'green'
    context.strokeStyle = 'green'
    black.classList.remove('active')
    red.classList.remove('active')
    green.classList.add('active')
    blue.classList.remove('active')
}
blue.onclick =function(){
    context.fillStyle = 'blue'
    context.strokeStyle = 'blue'
    black.classList.remove('active')
    red.classList.remove('active')
    green.classList.remove('active')
    blue.classList.add('active')
}
thin.onclick =function(){
    lineWidth = 5
}
thick.onclick =function(){
    lineWidth = 10
}
clear.onclick = function(){
    context.clearRect(0, 0, yyy.clientWidth, yyy.clientHeight)
    // 全屏清除的时候只需要将清除范围设置为全屏范围就行
}
download.onclick = function(){
    var url = yyy.toDataURL("image/png")
    // 图片的形式就是通过二进制代码的形式展示出来
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = '我的画儿'
    a.target = '_blank'
    a.click()
}


function  autoCanvasSize(canvas){
  setCanvasSize()
  window.onresize = function(){
    setCanvasSize()
  }

  function setCanvasSize(){
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight

    canvas.width = pageWidth
    canvas.height = pageHeight  
  }
}
function drawCircle(x,y,radius){
  context.beginPath()
  context.arc(x,y,radius,0,Math.PI*2);
  context.fill();
}

function drawLine(x1,y1,x2,y2){
  context.beginPath();
  context.moveTo(x1,y1)
  context.lineWidth = lineWidth
  context.lineTo(x2,y2)
  context.stroke()
  context.closePath();
}
function listenToUser(canvas){
  var using =false
  var LastPoint = {x:undefined,y:undefined}
//   特性检测
  if(document.body.ontouchstart !== undefined){
    // 说明是触屏设备
    canvas.ontouchstart = function(aaa){
        console.log('开始摸了')
        var x = aaa.touches[0].clientX //移动端的坐标点是存放在touches[0]中的，这里就是通过这一个语句将其获取出来
        var y = aaa.touches[0].clientY
        using = true
        if(eraserEnable){
          context.clearRect(x-5,y-5,10,10)
        }else {
          LastPoint = {"x":x,"y":y}    
        }
    }
    canvas.ontouchmove = function(aaa){
        console.log('边摸变动')
        var x = aaa.touches[0].clientX
        var y = aaa.touches[0].clientY
        if(!using){return}
        if(eraserEnable){
            context.clearRect(x-5,y-5,10,10)
        }else {
            var NewPoint = {"x":x,"y":y}
            drawLine(LastPoint.x,LastPoint.y,NewPoint.x,NewPoint.y)
            LastPoint =NewPoint
        }
    }
    canvas.ontouchend = function(aaa){
        using=false
        console.log('摸完了')
    }
  }else{
    // 说明不是触屏设备
    canvas.onmousedown = function(aaa){
        var x = aaa.clientX
        var y = aaa.clientY
        using = true
        if(eraserEnable){
          context.clearRect(x-5,y-5,10,10)
        }else {
          LastPoint = {"x":x,"y":y}    
        }
      }
    
      canvas.onmousemove = function(aaa){
        var x = aaa.clientX
        var y = aaa.clientY
        if(!using){return}
        if(eraserEnable){
            context.clearRect(x-5,y-5,10,10)
        }else {
            var NewPoint = {"x":x,"y":y}
            drawLine(LastPoint.x,LastPoint.y,NewPoint.x,NewPoint.y)
            LastPoint =NewPoint
        }
      }
      canvas.onmouseup = function(aaa){
        using=false
      }
  }
}