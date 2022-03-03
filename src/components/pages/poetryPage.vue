<template>
  <pageHeader/>
  <!--  <navigationBar/>-->
  <back-top/>
  <PoetsIndex/>
  <poetryCard v-for="(value,index) in 10"
              :key="index"
              :class="index%2===1?'right':'left'"
              :main_body="poety"
              class="item">
  </poetryCard>
  <search-input/>
  <footer-box class="footer1"/>
</template>

<script>
import swiper from "@/components/swiper";
import pageHeader from "@/components/pageHeader";
import poetryCard from "@/components/poetry";
import FooterBox from "@/components/footerBox";
import navigationBar from "@/components/navigationBar";
import LanternCard from "@/components/Lantern";
import PoetsIndex from "@/components/poetsIndex";
import BackTop from "@/components/backtop";
import SearchInput from "@/components/search";

export default {
  name: "poetryPage",
  components: {
    SearchInput,
    BackTop,
    PoetsIndex,
    // eslint-disable-next-line vue/no-unused-components
    LanternCard,
    FooterBox,
    // eslint-disable-next-line vue/no-unused-components
    poetryCard,
    // eslint-disable-next-line vue/no-unused-components
    swiper,
    pageHeader,
    // eslint-disable-next-line vue/no-unused-components
    navigationBar
  },
  data() {
    return {
      poety: {
        title: '将进酒',
        poet: '李白',
        body: [
          '君不见，黄河之水天上来，奔流到海不复回。',
          '君不见，高堂明镜悲白发，朝如青丝暮成雪。',
          '人生得意须尽欢，莫使金樽空对月。',
          '天生我材必有用，千金散尽还复来。',
          '烹羊宰牛且为乐，会须一饮三百杯。',
          '岑夫子，丹丘生，将进酒，杯莫停。',
          '与君歌一曲，请君为我倾耳听。',
          '钟鼓馔玉不足贵，但愿长醉不复醒。',
          '古来圣贤皆寂寞，惟有饮者留其名。',
          '陈王昔时宴平乐，斗酒十千恣欢谑。',
          '主人何为言少钱，径须沽取对君酌。',
          '五花马，千金裘，呼儿将出换美酒，与尔同销万古愁。',
        ]
      },

    }
  },

}


</script>

<style scoped>

.item {
  margin-top: 100px;
}
</style>
