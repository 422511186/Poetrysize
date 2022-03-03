<template>
  <div class="indexPage">
    <!--    <div class="swiperMask"></div>-->
    <swiper/>
    <pageHeader class="top-header"/>
    <navigationBar/>
    <footer-box class="footer1"/>
  </div>
</template>
<script>


import swiper from "@/components/swiper";
import pageHeader from "@/components/pageHeader";
import poetryCard from "@/components/poetry";
import FooterBox from "@/components/footerBox";
import navigationBar from "@/components/navigationBar";
import LanternCard from "@/components/Lantern";


export default {
  name: "indexK",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    LanternCard,
    // eslint-disable-next-line vue/no-unused-components
    FooterBox,
    // eslint-disable-next-line vue/no-unused-components
    poetryCard,
    // eslint-disable-next-line vue/no-unused-components
    swiper,
    // eslint-disable-next-line vue/no-unused-components
    pageHeader,
    // eslint-disable-next-line vue/no-unused-components
    navigationBar
  },
  data() {
    return {
      poety: {
        title: '静夜思',
        poet: '李白',
        body: [
          '君不见，黄河之水天上来，奔流到海不复回。\n',
          '君不见，高堂明镜悲白发，朝如青丝暮成雪。\n',
          '人生得意须尽欢，莫使金樽空对月。\n',
          '天生我材必有用，千金散尽还复来。\n',
          '烹羊宰牛且为乐，会须一饮三百杯。\n',
          '岑夫子，丹丘生，将进酒，杯莫停。\n',
          '与君歌一曲，请君为我倾耳听。\n',
          '钟鼓馔玉不足贵，但愿长醉不复醒。\n',
          '古来圣贤皆寂寞，惟有饮者留其名。\n',
          '陈王昔时宴平乐，斗酒十千恣欢谑。\n',
          '主人何为言少钱，径须沽取对君酌。\n',
          '五花马，千金裘，呼儿将出换美酒，与尔同销万古愁。'
        ]
      },

    }
  },

}

</script>

<style scoped>
.left {
  position: relative;
  left: -260px;
}

.right {
  position: relative;
  left: 260px;
}


.footer1 {
  margin-top: 200px;
}

/*body{*/


/*}*/

.indexPage {
  /*background-image: url(../../assets/images/hbghi.jpg);*/
  background-size: 100% 100%;
}


.swiperMask {

}

.top-header {
  top: -73px;
}
</style>
