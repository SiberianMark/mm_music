<template>
  <div id="app">
    <mc-header></mc-header>
    <mc-tab></mc-tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <mc-player></mc-player>
  </div>

</template>

<script>
import McHeader from 'components/mc-header/mc-header'
import McTab from 'components/mc-tab/mc-tab'
import McPlayer from 'components/mc-player/mc-player'
export default {
  name: 'app',
  components:{
    McHeader,
    McTab,
    McPlayer
  }
}
</script>
<style scoped lang="stylus" rel = "stylesheet/stylus">
#app {
}
</style>
