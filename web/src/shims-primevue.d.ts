declare module 'primevue/config' {
  import { Plugin } from 'vue';
  const PrimeVue: Plugin;
  export default PrimeVue;
}

declare module 'primevue/button' {
  import { DefineComponent } from 'vue';
  const Button: DefineComponent<{}, {}, any>;
  export default Button;
}
