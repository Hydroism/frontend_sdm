<template>
  <div class="about">
    <h1 @click="test">This is an about page</h1>
  </div>
</template>

<script>
export default {
  methods:{
    test(){
      console.log(this.$route);
    }
  }
}
</script>
