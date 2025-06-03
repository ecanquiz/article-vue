import { ref } from 'vue'
import type { Ref } from "vue";

export default () => {
  const articleDescription: Ref<string> = ref('');

  return { articleDescription }
}
