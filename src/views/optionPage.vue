<template>
  <div class="flex flex-col w-full justify-center items-center">
    <div class="flex w-[80%] flex-col text-[30px] font-semibold mb-[30px]">
      게임 옵션 설정
    </div>
    <div class="flex w-[50%] flex-col">
      <div class="flex flex-row w-full">
        <div class="flex w-[30%] font-semibold">카드단어숨기기</div>
        <div class="flex w-[70%]">
          <input
            class="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]"
            type="checkbox"
            role="switch"
            id="wordHide"
            @change="saveWordOption"
          />
        </div>
      </div>
      <div class="flex flex-row w-full mt-[20px]">
        <div class="flex w-[30%] font-semibold">랭킹초기화</div>
        <div class="flex w-[70%]">
          <div
            class="inline-flex items-center justify-center px-3 py-1 text-base font-medium leading-6 text-white whitespace-no-wrap bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            data-rounded="rounded-md"
            data-primary="blue-600"
            data-primary-reset="{}"
            @click="$store.commit('clearScore')"
          >
            초기화
          </div>
        </div>
      </div>
      <div class="flex flex-row w-full mt-[20px]">
        <div class="flex w-[30%] font-semibold">게임단어관리</div>
        <div class="flex flex-col w-[70%]">
          <div v-if="wordState === 'view'" class="flex flex-col">
            <div
              class="w-[65px] inline-flex items-center justify-center px-3 py-1 text-base font-medium leading-6 text-white whitespace-no-wrap bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mb-[10px]"
              data-rounded="rounded-md"
              data-primary="blue-600"
              data-primary-reset="{}"
              @click="wordState = 'edit'"
            >
              편집
            </div>
            <div class="flex" v-for="(word, idx) in wordList" :key="idx">
              {{ word }}
            </div>
          </div>
          <div class="flex w-full flex-col" v-if="wordState === 'edit'">
            <div class="flex w-full mb-[10px]">
              <div
                class="inline-flex items-center justify-center px-3 py-1 text-base font-medium leading-6 text-white whitespace-no-wrap bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-[10px]"
                data-rounded="rounded-md"
                data-primary="blue-600"
                data-primary-reset="{}"
                @click="saveWordList"
              >
                저장
              </div>
              <div
                class="inline-flex items-center justify-center px-3 py-1 text-base font-medium leading-6 text-white whitespace-no-wrap bg-gray-600 border border-gray-700 rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                data-rounded="rounded-md"
                data-primary="blue-600"
                data-primary-reset="{}"
                @click="wordState = 'view'"
              >
                취소
              </div>
            </div>
            <div>
              <textarea
                id="about"
                name="about"
                rows="15"
                v-model="wordListStr"
                class="block w-full px-3 py-2 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-0 focus:ring-inset focus:ring-gray-400"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex w-[50%] flex-col mt-[30px]">
      <blackButton linkTo="/" buttonLable="홈으로" />
    </div>
  </div>
</template>

<script>
import blackButton from '@/components/blackButton.vue';

export default {
  mounted() {
    document.getElementById('wordHide').checked =
      this.$store.getters.getWordHideOption;
    this.wordList = this.$store.getters.getWordList;
    this.wordList.forEach(w => {
      this.wordListStr += w + ',\n';
    });
  },
  components: {
    blackButton,
  },
  data() {
    return {
      wordState: 'view',
      wordListStr: '',
      wordList: [],
    };
  },
  methods: {
    saveWordOption(e) {
      this.$store.commit('setWordHideOption', e.target.checked);
    },
    saveWordList() {
      const temp = this.wordListStr
        .replace(/\n/g, '')
        .replace(/\s*/g, '')
        .replace(/,$/, '');

      const arr = temp.split(',');

      if (arr.length < 30) {
        alert('영어단어는 30개 이상 등록되어야합니다.');
        return;
      }
      arr.forEach(w => {
        if (w.length > 10) {
          alert('영어단어는 10자 이하의 단어만 등록 가능합니다. 확인해주세요');
          return;
        }
      });

      this.$store.commit('chageWordList');
      arr.forEach(w => {
        this.$store.commit('addWord', w);
      });
      this.wordList = this.$store.getters.getWordList;
      this.wordState = 'view';
      console.log(this.wordList);
    },
  },
};
</script>

<style lang="scss" scoped></style>
