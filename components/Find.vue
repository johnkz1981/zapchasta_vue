<template>
  <div class="section-header">
    <h2>Найти запчасть</h2>
    <div class="row">
      <div class="col-md-4">
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Артикул запчасти" aria-label="Recipient's username"
                 aria-describedby="button-addon2" ref="article"
                 @keyup.enter="toArticle"
          >
          <div class="input-group-append">
            <button
                    class="btn btn-outline-secondary"
                    type="button"
                    @click="toArticle"
                    id="button-addon2"
            >
              Найти
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'find',
    methods: {
      toArticle() {
        const article = this.$refs.article;
        if(article.value){

          this.$router.push({ path: '/article/', query: { q: article.value } });
          this.$store.dispatch('find/getDataArticle', {
            q: article.value
          });
        }
      },
    },
  }
</script>