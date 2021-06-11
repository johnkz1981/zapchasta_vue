<template>
  <section id="speakers-details" class="wow fadeIn">
    <div class="container">
      <find></find>
      <div v-show="isBusy"  class="spinner">
        <div class="dot1"></div>
        <div class="dot2"></div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <transition name="fade">
            <h2 v-show="isFind" style="align-items: center; color: red">Ничего не найдено!</h2>
          </transition>
          <transition-group name="fade">
            <li v-for="analogType in analogTypes" :key="analogType.title">
              <h4>{{ analogType.titleConvert }}</h4>
              <table-detail :analogType="analogType.title"></table-detail>
            </li>
          </transition-group>
        </div>

      </div>
    </div>

  </section>
</template>

<script>
  import Find from '../components/Find'
  import TableDetail from "../components/TableDetail";

  export default {
    name: 'Detail',
    data() {
      return {
        analogTypes: [],
        analogTypesConvert: {
          analog_type_N: 'Искомый артикул',
          analog_type_1: 'OEM аналоги',
          analog_type_0: 'Неоригинальные аналоги',
        },
        isFind: false
      }
    },
    components: {
      TableDetail,
      Find
    },
    methods: {
      makeToast(mess) {

        this.$bvToast.toast(mess, {
          title: 'Ошибка',
          variant: 'danger',
          solid: true,
          toaster: 'b-toaster-top-center',
        })
      }
    },
    computed: {
      isBusy() {
        return this.$store.getters['find/isBusy'];
      },
      error() {
        return this.$store.getters['error/mess'];
      }
    },
    async created() {

      const {q, brand} = this.$route.query;

      // const data = await fetch(`https://ugautodetal.ru/auto/api/?q=${article}&brand_title=${brand}`).then(res => res.json());
      await this.$store.dispatch('find/getDataDetail', {
        q,
        brand
      });

      const analogTypes = this.$store.getters['find/dataDetail'];
      if (Object.keys(analogTypes).length === 0) {
        this.isFind = true;
      }

      for (const analogType in analogTypes) {

        this.analogTypes.push({
          titleConvert: this.analogTypesConvert[analogType],
          title: analogType
        });
      }
    }
  }
</script>
<style scoped>
  .loader {
    align-items: center;
    display: flex;
    justify-content: center;
  }

  li {
    list-style-type: none;
  }
  .fade-enter-active, .fade-leave-active {
    animation: slide-out-right 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) reverse both;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {

  }

  @-webkit-keyframes slide-out-right {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      -webkit-transform: translateX(1000px);
      transform: translateX(1000px);
      opacity: 0;
    }
  }
  @keyframes slide-out-right {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      -webkit-transform: translateX(1000px);
      transform: translateX(1000px);
      opacity: 0;
    }
  }
  .container {
    margin-top: 8rem;
  }

  .sk-folding-cube {
    margin: 20px auto;
    width: 40px;
    height: 40px;
    position: relative;
    -webkit-transform: rotateZ(45deg);
    transform: rotateZ(45deg);
  }

  .sk-folding-cube .sk-cube {
    float: left;
    width: 50%;
    height: 50%;
    position: relative;
    -webkit-transform: scale(1.1);
    -ms-transform: scale(1.1);
    transform: scale(1.1);
  }
  .sk-folding-cube .sk-cube:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #333;
    -webkit-animation: sk-foldCubeAngle 2.4s infinite linear both;
    animation: sk-foldCubeAngle 2.4s infinite linear both;
    -webkit-transform-origin: 100% 100%;
    -ms-transform-origin: 100% 100%;
    transform-origin: 100% 100%;
  }
  .sk-folding-cube .sk-cube2 {
    -webkit-transform: scale(1.1) rotateZ(90deg);
    transform: scale(1.1) rotateZ(90deg);
  }
  .sk-folding-cube .sk-cube3 {
    -webkit-transform: scale(1.1) rotateZ(180deg);
    transform: scale(1.1) rotateZ(180deg);
  }
  .sk-folding-cube .sk-cube4 {
    -webkit-transform: scale(1.1) rotateZ(270deg);
    transform: scale(1.1) rotateZ(270deg);
  }
  .sk-folding-cube .sk-cube2:before {
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
  }
  .sk-folding-cube .sk-cube3:before {
    -webkit-animation-delay: 0.6s;
    animation-delay: 0.6s;
  }
  .sk-folding-cube .sk-cube4:before {
    -webkit-animation-delay: 0.9s;
    animation-delay: 0.9s;
  }
  @-webkit-keyframes sk-foldCubeAngle {
    0%, 10% {
      -webkit-transform: perspective(140px) rotateX(-180deg);
      transform: perspective(140px) rotateX(-180deg);
      opacity: 0;
    } 25%, 75% {
        -webkit-transform: perspective(140px) rotateX(0deg);
        transform: perspective(140px) rotateX(0deg);
        opacity: 1;
      } 90%, 100% {
          -webkit-transform: perspective(140px) rotateY(180deg);
          transform: perspective(140px) rotateY(180deg);
          opacity: 0;
        }
  }

  @keyframes sk-foldCubeAngle {
    0%, 10% {
      -webkit-transform: perspective(140px) rotateX(-180deg);
      transform: perspective(140px) rotateX(-180deg);
      opacity: 0;
    } 25%, 75% {
        -webkit-transform: perspective(140px) rotateX(0deg);
        transform: perspective(140px) rotateX(0deg);
        opacity: 1;
      } 90%, 100% {
          -webkit-transform: perspective(140px) rotateY(180deg);
          transform: perspective(140px) rotateY(180deg);
          opacity: 0;
        }
  }

  .spinner {
    margin: 100px auto;
    width: 40px;
    height: 40px;
    position: relative;
    text-align: center;

    -webkit-animation: sk-rotate 2.0s infinite linear;
    animation: sk-rotate 2.0s infinite linear;
  }

  .dot1, .dot2 {
    width: 60%;
    height: 60%;
    display: inline-block;
    position: absolute;
    top: 0;
    background-color: #f82249;
    border-radius: 100%;

    -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
    animation: sk-bounce 2.0s infinite ease-in-out;
  }

  .dot2 {
    top: auto;
    bottom: 0;
    -webkit-animation-delay: -1.0s;
    animation-delay: -1.0s;
  }

  @-webkit-keyframes sk-rotate { 100% { -webkit-transform: rotate(360deg) }}
  @keyframes sk-rotate { 100% { transform: rotate(360deg); -webkit-transform: rotate(360deg) }}

  @-webkit-keyframes sk-bounce {
    0%, 100% { -webkit-transform: scale(0.0) }
    50% { -webkit-transform: scale(1.0) }
  }

  @keyframes sk-bounce {
    0%, 100% {
      transform: scale(0.0);
      -webkit-transform: scale(0.0);
    } 50% {
        transform: scale(1.0);
        -webkit-transform: scale(1.0);
      }
  }
</style>