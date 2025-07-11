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
    images     : article.images     ? article.images      : []
  })

  const {
    errors,
    pending,

    getError
  } = useHttp()

  onMounted(() => {
    /*pending.value = true
    CategoryService.getCategoriesSelect()
      .then((response) => {
        categories.value = response.data.map(function (c) {
          return {
            id: c.id,
            name: c.family
          }
        }).sort(ascBubble)
      })
      .catch((err) => {
        errors.value = getError(err)
      })
      .finally(() => {
        pending.value = false
      })

    pending.value = true
    MarkService.getMarksSelect()
      .then((response) => {
        marks.value = response.data.sort(ascBubble)
      })
      .catch((err) => {
        errors.value = getError(err)
      })
      .finally(() => {
        pending.value = false
      })

    pending.value = true
    CommonService.getMeasureUnitTypes()
      .then((response) => {
        measureUnitTypes.value = response.data.map(function (mut) {
          return {
            id: mut.id,
            name: mut.description
          }
        }).sort(ascBubble)
      })
      .catch((err) => {
        errors.value = getError(err)
      })
      .finally(() => {
        pending.value = false;
      })*/
  })

  const rules = computed(() => {
    return {
      name: {
        required: helpers.withMessage("Campo requerido", required),
      },      
      status: {
        required: helpers.withMessage("Campo requerido", required),
      },
      images: {
      //  required: helpers.withMessage("Campo requerido", required),
      },
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
