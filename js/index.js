let square =
    {
      props:["active","cellNum"],
     template:"<div class='cell' :class='{red:active}' @click='clicked'></div>",
      methods:{
        clicked(){
          this.$emit('clicked',this.active)
                 }
              },
    };
let app = new Vue({
  el:"#app",
  data:{numCells:9,active:false,chosen:null,scores:0,speed:1000,speedTimeHandler:null,gameTimeHandler:null,clickFlag:true,screen:0},
  components:{Square:square},
  watch:{
    speed:function(){
      this.start()
    }
  },
  mounted(){
    this.screen=0
    this.start()
 
  },
  methods:{
       start()
    {
       this.screen = 1
       clearTimeout(this.speedTimeHandler)
       clearTimeout(this.gameTimeHandler)
       this.gameTimeHandler = setTimeout(this.finish,10000)
       this.scores= 0
       this.render()
    },
    finish()
    {
      this.screen=2
    },
      
    clicked(cell){
      if(this.clickFlag){
      if(cell)
      {
         this.scores+=5    
      }
      else this.scores-=5
      }
     this.clickFlag = this.rand()
    }, 
 
    rand(){   
     let randNum =  _.random(this.numCells);
     this.chosen = randNum;
     return true
    },
      render()
    {       
      this.clickFlag = true
      this.rand()   
      this.speedTimeHandler = setTimeout(this.render,this.speed)
              },
   },

});
