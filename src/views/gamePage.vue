<template>
  <div class="flex flex-col w-full min-w-[830px] justify-center items-center">
    <div class="flex w-full flex-row justify-center items-center">
      <div class="flex flex-col w-[360px] mr-[50px] justify-center">
        <div class="flex flex-row w-full justify-center mt-[100px]">
          <div
            v-for="(a, idx) in answer"
            :key="idx"
            class="flex text-[30px] w-[20px] mr-[5px] font-semibold"
            :class="{
              'border-b-[4px] border-black': a.matched === 'false',
              'text-red-600': a.matched === 'finish',
            }"
          >
            {{
              a.matched === 'true' || a.matched === 'finish'
                ? a.char.toUpperCase()
                : ' '
            }}
          </div>
        </div>

        <div class="flex justify-center font-medium text-[20px] mt-[10px]">
          오류횟수 :&nbsp;<span class="text-red-600">{{ errCnt }}</span>
          / 8
        </div>
        <div class="flex justify-center font-medium text-[20px] mt-[10px]">
          <span class="mr-[10px]">경과 시간</span> :&nbsp;
          <span>{{ stopwatch === null ? '00' : stopwatch.minutes }}</span
          >분<span>{{ stopwatch === null ? '00' : stopwatch.seconds }}</span
          >초
        </div>
        <div
          v-if="step === 8 || step === 99"
          class="flex mt-[150px] w-full justify-center"
        >
          <blackButton
            linkTo="/2"
            buttonLable="다시하기"
            customClass="ml-[15px]"
          />
          <div @click="showScoreModal = true" v-if="step === 99">
            <blackButton
              linkTo=""
              buttonLable="점수기록"
              customClass="ml-[15px]"
            />
          </div>
          <blackButton
            linkTo="/"
            buttonLable="홈으로"
            customClass="ml-[15px]"
          />
        </div>
      </div>
      <div class="flex flex-col flex-wrap justify-center items-center">
        <div class="flex w-full justify-center">
          <img
            :src="require(`@/assets/images/step${step}.png`)"
            class="w-[300px]"
          />
        </div>
        <div class="flex w-full justify-center -mt-[10px]">
          <img src="@/assets/images/base.png" class="w-[400px]" />
        </div>
      </div>
    </div>

    <div class="flex w-[50%] mt-[50px] justify-center items-center flex-wrap">
      <div v-for="(c, idx) in alphabet" :key="idx">
        <div v-if="c.show" class="mr-[10px] mb-[10px]">
          <div
            class="relative inline-block px-4 py-2 font-medium group cursor-pointer"
            @click="check(idx)"
          >
            <span
              class="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"
            ></span>
            <span
              class="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"
            ></span>
            <span
              class="relative text-black group-hover:text-white"
              :class="{ 'text-red-600': c.work === false }"
              >{{ c.name }}</span
            >
          </div>
        </div>
      </div>
    </div>

    <div
      class="flex w-[50%] mt-[30px] justify-center items-center flex-wrap"
      v-if="step !== 99 && this.step !== 8"
    >
      <blackButton linkTo="/" buttonLable="홈으로" customClass="ml-[15px]" />
      <blackButton linkTo="/2" buttonLable="다시하기" customClass="ml-[15px]" />
    </div>
  </div>
  <regScoreModalBox
    :state="showScoreModal"
    :userScore="score"
    :min="min"
    :sec="sec"
    @scoreClose="showScoreModal = false"
  />
</template>

<script>
import { Animate, initTE } from 'tw-elements';
import blackButton from '@/components/blackButton.vue';
import regScoreModalBox from '../components/regScoreModalBox.vue';
import { useStopwatch } from 'vue-timer-hook';

export default {
  mounted() {
    initTE({ Animate });
    const answerWord = history.state.gameWord;
    this.answer = answerWord
      .split('')
      .map(char => ({ char: char, matched: 'false' }));
    this.answerCnt = this.answer.length;
    const autoStart = true;
    this.stopwatch = useStopwatch(autoStart);
    // console.log(answerWord);
  },
  components: { blackButton, regScoreModalBox },
  data() {
    return {
      score: 0,
      min: 0,
      sec: 0,
      step: 0,
      errCnt: 0,
      answer: [],
      answerCnt: 0,
      matchedCnt: 0,
      result: '',
      stopwatch: null,
      showScoreModal: false,
      alphabet: [
        { name: 'A', show: true, work: true },
        { name: 'B', show: true, work: true },
        { name: 'C', show: true, work: true },
        { name: 'D', show: true, work: true },
        { name: 'E', show: true, work: true },
        { name: 'F', show: true, work: true },
        { name: 'G', show: true, work: true },
        { name: 'H', show: true, work: true },
        { name: 'I', show: true, work: true },
        { name: 'J', show: true, work: true },
        { name: 'K', show: true, work: true },
        { name: 'L', show: true, work: true },
        { name: 'M', show: true, work: true },
        { name: 'N', show: true, work: true },
        { name: 'O', show: true, work: true },
        { name: 'P', show: true, work: true },
        { name: 'Q', show: true, work: true },
        { name: 'R', show: true, work: true },
        { name: 'S', show: true, work: true },
        { name: 'T', show: true, work: true },
        { name: 'U', show: true, work: true },
        { name: 'V', show: true, work: true },
        { name: 'W', show: true, work: true },
        { name: 'X', show: true, work: true },
        { name: 'Y', show: true, work: true },
        { name: 'Z', show: true, work: true },
      ],
    };
  },
  methods: {
    showAnswer() {
      this.answer.forEach(element => {
        if (element.matched === 'false') {
          element.matched = 'finish';
        }
      });
      console.log('finish', this.answer);
    },
    check(idx) {
      if (this.step >= 8) {
        return;
      }
      if (this.alphabet[idx].work === false) return;

      let found = false;
      this.answer.forEach(element => {
        if (element.char.toUpperCase() === this.alphabet[idx].name) {
          element.matched = 'true';
          found = true;
          this.matchedCnt += 1;
        }
      });

      if (found === false) {
        this.step += 1;
        this.errCnt += 1;
        if (this.step === 8) {
          this.showAnswer();
          this.stopwatch.pause();
        }
      } else {
        this.alphabet[idx].show = false;
      }
      this.alphabet[idx].work = false;

      if (this.matchedCnt === this.answerCnt) {
        this.step = 99;
        this.stopwatch.pause();
        this.min = Number(this.stopwatch.minutes);
        this.sec = Number(this.stopwatch.seconds);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
