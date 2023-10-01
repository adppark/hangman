<template>
  <div class="flex w-full justify-center items-center">
    <div class="flex w-[80%] flex-col">
      <div
        class="flex w-full justify-center items-center text-[26px] mt-[20px] mb-[20px]"
      >
        단어 카드 한장을 선택해주세요
      </div>
      <div class="flex flex-row w-full justify-between items-center">
        <div v-for="(s, idx) in selectedWord" :key="idx">
          <rotateCard :word="selectedWord[idx]" @click="selectCard(idx)" />
        </div>
      </div>
      <div class="flex flex-row w-full justify-center items-center mt-[20px]">
        <blackButton linkTo="/" buttonLable="홈으로" />
        <blackButton
          linkTo="#"
          buttonLable="카드섞기"
          customClass="ml-[15px]"
          @click="refreshWords"
        />
      </div>
    </div>
  </div>
</template>

<script>
import rotateCard from '../components/rotateCard.vue';
import blackButton from '@/components/blackButton.vue';

export default {
  mounted() {
    this.selectedWord = this.selectWords();
    // console.log(this.words);
    // console.log(this.selectedWord);
  },
  components: {
    rotateCard,
    blackButton,
  },
  data() {
    return {
      words: this.$store.getters.getWordList,
      selectedWord: [],
    };
  },
  methods: {
    refreshWords() {
      this.selectedWord = this.selectWords();
      // console.log(this.selectedWord);
    },
    selectWords() {
      const tempArray = [...this.words]; // 원본 배열을 복사
      const result = [];

      for (let i = 0; i < 3; i++) {
        if (tempArray.length === 0) break; // 더 이상 뽑을 아이템이 없으면 종료

        const randomIndex = Math.floor(Math.random() * tempArray.length); // 랜덤 인덱스 생성
        const item = tempArray[randomIndex]; // 랜덤 인덱스의 아이템을 가져옴

        result.push(item); // 결과 배열에 아이템을 추가
        tempArray.splice(randomIndex, 1); // 복사한 배열에서 뽑힌 아이템을 제거
      }
      return result;
    },
    selectCard(idx) {
      this.$router.push({
        name: 'third',
        state: {
          gameWord: this.selectedWord[idx],
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
