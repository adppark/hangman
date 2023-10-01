<template>
  <div class="flip">
    <div class="flip-content">
      <div class="flip-front">
        <img src="@/assets/images/card.png" />
      </div>
      <div class="flip-back">
        <div class="mt-[200px] font-extrabold cursor-pointer hover:underline">
          {{ $store.getters.getWordHideOption ? blank : word.toUpperCase() }}
          <br /><br /><br />
          [ 게임 시작하기 ]
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    word: String,
  },
  mounted() {
    for (let i = 0; i < this.word.length; i++) {
      this.blank += '? ';
    }
  },
  data() {
    return {
      blank: '',
    };
  },
};
</script>

<style lang="scss" scoped>
.flip {
  width: 358px;
  height: 512px;
  text-align: center;
  perspective: 600px;
}
.flip-content {
  width: 100%;
  height: 100%;
  transition: transform 0.4s;
  transform-style: preserve-3d;
}
.flip:hover .flip-content {
  transform: rotateY(180deg);
  transition: transform 0.3s;
}
.flip-front {
  position: absolute;
  height: 100%;
  width: 100%;
  backface-visibility: hidden;
  background-image: url('~@/assets/images/card.png');
}
.flip-back {
  position: absolute;
  height: 100%;
  width: 100%;
  backface-visibility: hidden;
  background-image: url('~@/assets/images/card_back.png');
  color: #fff;
}
.flip-back {
  transform: rotateY(180deg);
}
</style>
