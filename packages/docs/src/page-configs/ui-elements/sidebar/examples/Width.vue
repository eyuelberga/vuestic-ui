<template>
  <div style="height: 13rem; border: 1px solid var(--va-secondary);">
    <va-sidebar
      :minimized="minimized"
      textColor="dark"
      width="11rem"
      minimizedWidth="64px"
    >
      <template v-for="item in items" :key="item.title">
        <va-sidebar-item :active="item.active">
          <va-sidebar-item-content>
            <va-icon :name="item.icon" />
            <va-sidebar-item-title>
              {{ item.title }}
            </va-sidebar-item-title>
          </va-sidebar-item-content>
        </va-sidebar-item>
      </template>
    </va-sidebar>
  </div>

  <va-checkbox class="mt-2" v-model="minimized" label="Minimized" />
</template>

<script>
export default {
  data () {
    return {
      items: [
        { title: 'Dashboard', icon: 'dashboard' },
        { title: 'Sidebar demo', icon: 'room', active: true },
        { title: 'Loop', icon: 'loop' },
      ],
      minimized: false,
    }
  },
}
</script>
