<template>
  <div id="app" class="body-main">
    <router-view/>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  @Component
  export default class App extends Vue {
      created(){
          this.listenerMateMsket()
          // this.realBlock('2021-03-30 14:39:50','2021-03-30 15:00:16', 10000, 0.03773485, 100.13773485)
          // this.realBlock('2021-03-30 14:39:50','2021-03-30 15:00:16', 10000, 0.1, 100.13773485)
          // this.realBlock('2021-03-30 14:39:50','2021-03-30 15:00:16', 10000, 100, 100.13773485)
      }

      realBlock(start: string, end: string, total: number, tokenNumber: number, totalTokenNumber: number, blockTimes: number = 3000){
          const _time = new Date(end).getTime() - new Date(start).getTime();
          const _totalBlock = Math.floor(_time / blockTimes);
          const _blockAvgToken = total / _totalBlock
          const _scaleToken =  tokenNumber / totalTokenNumber
          console.error('getToken----->', _blockAvgToken * _scaleToken * _totalBlock)
      }

      /**
       * Listener MateMsket Address Change
       */
      public listenerMateMsket(){
          if(window['ethereum']){
              window['ethereum'].on('accountsChanged', res=>{
                  if(res && res.length > 0 && this.$route.path != '/login'){
                      window.location.href = window.location.origin + '/login' ;
                  }
              })
          }
      }


  }

</script>

<style lang="scss">
#app {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.65);
  width: 100%;
  height: 100%;
  /*justify-items: center;*/
  /*align-items: center;*/
}
</style>
