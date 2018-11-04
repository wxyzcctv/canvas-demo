var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');

autoCanvasSize(yyy)

listenToUser(yyy)

var eraserEnable = false
eraser.onclick = function(){
  eraserEnable = true
  actions.className = 'actions x'
}
brush.onclick = function(){
  eraserEnable = false
  actions.className = 'actions'
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
  context.fillStyle = 'black'
  context.arc(x,y,radius,0,Math.PI*2);
  context.fill();
}

function drawLine(x1,y1,x2,y2){
  context.beginPath();
  context.strokeStyle = 'black'
  context.moveTo(x1,y1)
  context.lineWidth = 5
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