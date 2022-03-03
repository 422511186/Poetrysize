<template>
  <pageHeader/>
<!--  <navigationBar/>-->
<!--  <transition name="component-fade" mode="out-in">-->
    <router-view ></router-view>
<!--  </transition>-->
  <footer-box class="footer1"/>
  <search-input/>
</template>
<!--诗人页面-->
<script>
import LanternCard from "@/components/Lantern";
import FooterBox from "@/components/footerBox";
import poetryCard from "@/components/poetry";
import swiper from "@/components/swiper";
import pageHeader from "@/components/pageHeader";
import navigationBar from "@/components/navigationBar";
import SearchInput from "@/components/search";

export default {
  name: "poetPage",
  components: {
    SearchInput,
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
  mounted() {
    this.$router.push('/poetCard');
  }
}
</script>

<style scoped>

</style>
