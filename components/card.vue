<template>
  <section>
    <div
      v-for="(item, index) in items"
      :key="index"
      class="max-w-sm lg:max-w-md lg:flex my-4 scale-on-hover"
      @click="load(item)"
    >
      <div
        class="
          border-r border-b border-l border-t border-gray-400
          lg:border-gray-400
          bg-white
          rounded-b
          lg:rounded-b-none lg:rounded-r
          p-4
          w-full
          flex flex-col
          justify-between
          leading-normal
        "
      >
        <div class="mb-8">
          <div class="text-gray-900 font-bold text-xl mb-2">
            {{ item.title }}
          </div>
          <section class="flex flex-col justify-between h-full">
            <p class="text-gray-700 text-base">
              {{ item.description }}
            </p>
            <div class="text-sm pt-4 self-end">
              <p class="text-gray-900 leading-none">
                Estimated read time:
                <span class="text-gray-600 font-bold">{{
                  item.read_time
                }}</span>
                minutes
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'Card',
  props: {
    items: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  methods: {
    load(item) {
      this.$router.push(`/articles/${item.id}`);
    },
  },
};
</script>
