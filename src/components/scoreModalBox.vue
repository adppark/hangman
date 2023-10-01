<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="close">
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
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
            >
              <div>
                <div
                  class="flex flex-col mt-3 text-center sm:mt-5 justify-center"
                >
                  <DialogTitle
                    as="h3"
                    class="text-[20px] mb-[10px] font-semibold leading-6 text-gray-900"
                    >점수판
                  </DialogTitle>
                  <div class="mt-2" v-if="scoreList.length === 0">
                    아직 등록된 점수가 없습니다!<br />게임을 통해 점수를
                    등록해보세요!
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
                      ) {{ s.name }} -- [오류 : {{ s.score }} / {{ s.min }}분{{
                        s.sec
                      }}초]
                    </div>
                  </div>
                </div>
              </div>
              <div class="flex flex-row justify-center mt-[30px]">
                <blackButton
                  linkTo="/2"
                  buttonLable="게임하러가기"
                  customClass="mr-[15px]"
                />
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
  },
  watch: {
    state(val) {
      this.open = val;
      if (this.open) {
        this.scoreList = this.$store.getters.getScoreList;
        console.log(this.$store.state.scores);
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
    };
  },
  methods: {
    close() {
      this.$emit('scoreClose');
    },
  },
};
</script>
