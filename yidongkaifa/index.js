import Sprite   from '../base/sprite'
import DataBus  from '../databus'

const screenWidth    = window.innerWidth
const screenHeight   = window.innerHeight

// 玩家相关常量设置
const PLAYER_IMG_SRC = 'images/hero.png'
const PLAYER_WIDTH   = 64
const PLAYER_HEIGHT  = 100

let databus = new DataBus()

export default class Player extends Sprite {
  constructor() {
    super(PLAYER_IMG_SRC, PLAYER_WIDTH, PLAYER_HEIGHT)

    // 玩家默认处于屏幕底部居中位置
    this.x = screenWidth / 2 
    this.y = screenHeight - this.height

    // 用于在手指移动的时候标识手指是否已经在飞机上了
    this.touched = false

    this.bullets = []

    // 初始化事件监听
    this.initEvent()
  }

  /**
   * @param {Number} x: 手指的X轴坐标
   * @param {Number} y: 手指的Y轴坐标
   */
  checkIsFingerOnAir(x, y) {
    const deviation = 30

    return !!(   x >= this.x - deviation
              && y >= this.y - deviation
              && x <= this.x + this.width + deviation
              && y <= this.y + this.height + deviation  )
  }

  /**
   * 根据手指的位置设置汽车的位置
   
   * 同时限定飞机的活动范围限制在屏幕中
   */
  setAirPosAcrossFingerPosZ(c, y) {
    let disX = c
    let disY = screenHeight - this.height 

    if ( disX < 0 )
      disX = 0

    else if ( disX > screenWidth - this.width )
      disX = screenWidth - this.width

    if ( disY <= 0 )
      disY = 0

    else if ( disY > screenHeight - this.height )
      disY = screenHeight - this.height

    this.x = disX
    this.y = disY
  }

  /**
   * 玩家响应手指的触摸事件
   * 改变汽车的位置
   */
  initEvent() {
    this.x = screenWidth/2.4
    canvas.addEventListener('touchstart', ((e) => {
      e.preventDefault()

      let x = e.touches[0].clientX
      let y = e.touches[0].clientY
      let b = 0
      let c = 50
      if (x < screenWidth / 2.4) b = -1
      if (x > screenWidth / 2.4) b = 1
      if (b == -1) { if (this.x == screenWidth / 6) c = screenWidth / 6 }
      if (b == -1) { if (this.x == screenWidth / 2.4) c = screenWidth / 6}
      if (b == -1) { if (this.x == screenWidth / 1.4) c = screenWidth / 2.4 }
      if (b == 1) { if (this.x == screenWidth / 6) c = screenWidth / 2.4}
      if (b == 1) { if (this.x == screenWidth / 2.4) c = screenWidth / 1.4}
      if (b == 1) { if (this.x == screenWidth / 1.4) c = screenWidth / 1.4 }

   
       this.setAirPosAcrossFingerPosZ(c, y)
      

    }).bind(this))

    canvas.addEventListener('touchmove', ((e) => {
      e.preventDefault()


      
  

    }).bind(this))

    canvas.addEventListener('touchend', ((e) => {
      e.preventDefault()


     
    }).bind(this))
  }


  
}
