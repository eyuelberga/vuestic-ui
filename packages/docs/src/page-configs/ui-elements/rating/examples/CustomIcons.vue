<template>
  <va-rating class="mb-2"
    icon="favorite"
    empty-icon="favorite_border"
    v-model="value"
  />
  <va-rating
    icon="thumb_up_alt"
    empty-icon="thumb_up_off_alt"
    v-model="value"
  />
</template>

<script>
export default {
  data () {
    return {
      value: 3,
    }
  },
}
</script>
