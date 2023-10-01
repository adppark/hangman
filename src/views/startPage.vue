<template>
  <div class="flex w-full justify-center">
    <div class="flex flex-col w-[80%] justify-center items-center">
      <div class="flex justify-center">
        <img src="@/assets/images/logo.png" class="w-[70%]" />
      </div>
      <div class="flex mt-[100px]">
        <blackButton linkTo="/2" buttonLable="게임시작" />
        <blackButton
          linkTo="/#"
          buttonLable="랭킹보기"
          customClass="ml-[15px]"
          @click="scoreOpen = true"
        />
        <blackButton
          linkTo="/option"
          buttonLable="옵션설정"
          customClass="ml-[15px]"
        />
      </div>
    </div>
  </div>

  <scoreModalBox :state="scoreOpen" @scoreClose="scoreOpen = false" />
</template>

<script>
import blackButton from '@/components/blackButton.vue';
import scoreModalBox from '../components/scoreModalBox.vue';

export default {
  components: {
    blackButton,
    scoreModalBox,
  },
  data() {
    return {
      scoreOpen: false,
    };
  },
};
</script>

<style lang="scss" scoped></style>
