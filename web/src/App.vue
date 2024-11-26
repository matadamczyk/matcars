<template>
  <div>
    <Navbar />
  </div>
</template>

<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Condensed:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Oswald:wght@200..700&display=swap");

:root {
  --main-font: "IBM Plex Sans Condensed", sans-serif;
  font-family: var(--main-font);

  --orange: #ffa90a;
  --light-orange: #ffd793;
  --white: #ffffff;
  --light-grey: #999999;
  --dark-grey: #262626;
  --black: #000000;
}

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  background: rgb(153,153,153);
  background: linear-gradient(45deg, rgba(153,153,153,1) 0%, rgba(214,214,214,1) 50%, rgba(153,153,153,1) 100%);
}
.p-dialog.p-component {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 30px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
.p-button-text.p-button-secondary {
  margin: 15px;
  color: var(--white) !important;
}
.p-dialog-mask {
  background-color: rgba(0, 0, 0, 0.4) !important;
  backdrop-filter: blur(4px); 
  -webkit-backdrop-filter: blur(4px); 
}
</style>
