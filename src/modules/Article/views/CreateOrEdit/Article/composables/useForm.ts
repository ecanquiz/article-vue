import { onMounted, reactive, computed } from 'vue'

import useHttp from "@/core/composables/useHttp";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import type { Article } from "@/modules/Article/types/Article"
// import { ascBubble } from "@/utils/helpers";

export default (article: Article) => {
  const form = reactive({
    int_cod    : article.int_cod    ? article.int_cod    : '', 
    name       : article.name       ? article.name       : '',    
    status     : article.status     ? article.status     : true, 
    imageNames : article.imageNames     ? article.imageNames      : []
  })

  const {
    errors,
    pending,

    // getError
  } = useHttp();

  const rules = computed(() => {
    return {
      name: {
        required: helpers.withMessage("Campo requerido", required),
      },      
      status: {
        required: helpers.withMessage("Campo requerido", required),
      },
      imageNames: {},
    }
  })

  const v$ = useVuelidate(rules, form);

  return {
    form,
    errors,
    pending,

    v$      
  }
}
