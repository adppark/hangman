<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="open = false">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
            >
              <div>
                <div class="mt-3 text-center sm:mt-5">
                  <DialogTitle
                    as="h3"
                    class="text-[20px] font-semibold text-gray-900 mb-[20px]"
                    >점수 등록
                  </DialogTitle>
                  <div class="flex flex-row w-full">
                    <div class="flex flex-col w-[50%]">
                      <div v-if="scoreList.length === 0">
                        아직 등록된 점수가 없습니다.
                      </div>
                      <div
                        class="mt-2 flex flex-row justify-center"
                        v-for="(s, idx) in scoreList"
                        :key="idx"
                      >
                        <div v-if="idx < 3">
                          <img
                            :src="require(`@/assets/images/icon${idx + 1}.png`)"
                            class="h-[22px]"
                          />
                        </div>
                        <div v-if="idx >= 3">{{ idx + 1 }}등</div>
                        <div>
                          ) {{ s.name }} -- [오류 : {{ s.score }} /
                          {{ s.min }}분{{ s.sec }}초]
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-col w-[50%]">
                      <div class="w-full">
                        내 점수 : 오류 - {{ userScore }} / {{ min }}분{{
                          sec
                        }}초
                      </div>
                      <div class="relative mt-[20px]">
                        <label
                          for="name"
                          class="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                          >이름</label
                        >
                        <input
                          type="text"
                          name="name"
                          id="name"
                          v-model="username"
                          class="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="flex mt-[40px] justify-center"
                v-if="isReged === false"
              >
                <div @click="storeScore">
                  <blackButton
                    linkTo=""
                    customClass="mr-[15px]"
                    buttonLable="등록"
                  />
                </div>
                <div @click="close">
                  <blackButton linkTo="" buttonLable="취소" />
                </div>
              </div>

              <div
                class="flex mt-[40px] justify-center"
                v-if="isReged === true"
              >
                <div @click="close">
                  <blackButton linkTo="" buttonLable="닫기" />
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue';
import blackButton from '@/components/blackButton.vue';

export default {
  props: {
    state: Boolean,
    userScore: Number,
    min: Number,
    sec: Number,
  },
  watch: {
    state(val) {
      this.open = val;
      if (this.open) {
        this.scoreList = this.$store.getters.getScoreList;
      }
    },
  },
  components: {
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot,
    blackButton,
  },
  data() {
    return {
      open: false,
      scoreList: [],
      username: '',
      isReged: false,
    };
  },
  methods: {
    storeScore() {
      const data = {
        name: this.username,
        score: this.userScore,
        min: this.min,
        sec: this.sec,
      };
      this.$store.commit('addScore', data);

      this.scoreList = this.$store.getters.getScoreList;
      this.isReged = true;
    },
    close() {
      this.$emit('scoreClose');
    },
  },
};
</script>
