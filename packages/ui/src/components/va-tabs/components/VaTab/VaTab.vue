<template>
  <component
    :is="tagComputed"
    ref="tabElement"
    class="va-tab"
    role="tab"
    :aria-selected="isActive"
    :aria-disabled="$props.disabled || parentDisabled"
    :href="hrefComputed"
    :target="target"
    :to="to"
    :replace="replace"
    :exact="exact"
    :active-class="activeClass"
    :exact-active-class="exactActiveClass"
    :class="classComputed"
    :style="computedStyle"
    @mouseenter="updateHoverState(true)"
    @mouseleave="updateHoverState(false)"
  >
    <div
      class="va-tab__content"
      v-on="keyboardFocusListeners"
      :tabindex="tabIndexComputed"
      @focus="onFocus"
      @click="onTabClick"
      @keydown.enter="onTabKeydown"
    >
      <slot>
        <va-icon
          v-if="icon"
          class="va-tab__icon"
          size="small"
          :name="icon"
        />
        <span
          class="va-tab__label"
          v-text="label"
        />
      </slot>
    </div>
  </component>
</template>

<script lang="ts">
import { computed, defineComponent, inject, onBeforeUnmount, onMounted, ref, shallowRef } from 'vue'

import { useRouterLink, useRouterLinkProps, useKeyboardOnlyFocus, useColors } from '../../../../composables'

import { TabsViewKey, TabsView, TabComponent } from '../../types'

import { VaIcon } from '../../../va-icon'

export default defineComponent({
  name: 'VaTab',
  components: { VaIcon },
  emits: ['click', 'keydown-enter', 'focus'],

  props: {
    ...useRouterLinkProps,
    selected: { type: Boolean, default: false },
    color: { type: String, default: '' },
    icon: { type: String, default: '' },
    label: { type: String, default: '' },
    disabled: { type: Boolean },
    name: { type: [String, Number] },
    tag: { type: String, default: 'div' },
  },

  setup: (props, { emit }) => {
    const tabElement = shallowRef<HTMLElement>()

    const isActive = ref(false)
    const hoverState = ref(false)
    const rightSidePosition = ref(0)
    const leftSidePosition = ref(0)
    const { hasKeyboardFocus, keyboardFocusListeners } = useKeyboardOnlyFocus()
    const { tagComputed, hrefComputed, isActiveRouterLink } = useRouterLink(props)
    const classComputed = computed(() => ({ 'va-tab--disabled': props.disabled }))
    const {
      parentDisabled,
      selectTab,
      moveToTab,
      registerTab,
      unregisterTab,
    } = inject<TabsView>(TabsViewKey, {
      parentDisabled: false,
      tabsList: [],
      selectTab: (tab: TabComponent) => tab,
      moveToTab: (tab: TabComponent) => tab,
      registerTab: (tab: TabComponent) => tab,
      unregisterTab: (tab: TabComponent) => tab,
    })
    const tabIndexComputed = computed(() => (props.disabled || parentDisabled) ? -1 : 0)

    const { getColor } = useColors()
    const colorComputed = computed(() => getColor(props.color))

    const computedStyle = computed(() => ({
      color: hasKeyboardFocus.value || hoverState.value || isActive.value ? colorComputed.value : 'inherit',
    }))

    const updateHoverState = (isHover: boolean) => {
      hoverState.value = isHover
    }

    const updateSidePositions = () => {
      const componentOffsetLeft = tabElement.value?.offsetLeft || 0
      const componentOffsetWidth = tabElement.value?.offsetWidth || 0

      rightSidePosition.value = componentOffsetLeft + componentOffsetWidth
      leftSidePosition.value = componentOffsetLeft
    }

    const onTabClick = () => {
      selectTab(tabComponent)
      emit('click')
    }

    const onTabKeydown = () => {
      selectTab(tabComponent)
      emit('keydown-enter')
    }

    const onFocus = () => {
      if (hasKeyboardFocus.value) {
        moveToTab(tabComponent)
      }

      emit('focus')
    }

    const tabComponent: TabComponent = {
      name: computed(() => props.name),
      id: null,
      tabElement,
      isActive,
      tabIndexComputed,
      isActiveRouterLink,
      rightSidePosition,
      leftSidePosition,
      onTabClick,
      onTabKeydown,
      onFocus,
      updateSidePositions,
    }

    onMounted(() => {
      registerTab(tabComponent)
    })

    onBeforeUnmount(() => {
      unregisterTab(tabComponent)
    })

    return {
      tabElement,
      parentDisabled,
      isActive,
      hoverState,
      hasKeyboardFocus,
      keyboardFocusListeners,
      tagComputed,
      hrefComputed,
      isActiveRouterLink,
      colorComputed,
      classComputed,
      computedStyle,
      tabIndexComputed,
      rightSidePosition,
      leftSidePosition,
      updateHoverState,
      updateSidePositions,
      onTabClick,
      onTabKeydown,
      onFocus,
    }
  },
})
</script>

<style lang="scss">
  @import "../../../../styles/resources";
  @import 'variables';

  .va-tab {
    align-items: var(--va-tab-align-items);
    display: var(--va-tab-display);
    flex: var(--va-tab-flex);
    font-weight: var(--va-tab-font-weight);
    line-height: var(--va-tab-line-height);
    height: var(--va-tab-height);
    max-width: var(--va-tab-max-width);
    text-align: var(--va-tab-text-align);
    vertical-align: var(--va-tab-vertical-align);
    color: var(--va-tab-color);

    &__content {
      align-items: var(--va-tab-content-align-items);
      color: var(--va-tab-content-color);
      display: var(--va-tab-content-display);
      flex: var(--va-tab-content-flex);
      height: var(--va-tab-content-height);
      justify-content: var(--va-tab-content-justify-content);
      max-width: var(--va-tab-content-max-width);
      text-decoration: var(--va-tab-content-text-decoration);
      transition: var(--va-tab-content-transition);
      user-select: var(--va-tab-content-user-select);
      white-space: var(--va-tab-content-white-space);
      padding: var(--va-tab-content-padding);
      cursor: var(--va-tab-content-cursor);
    }

    &__icon {
      margin-right: var(--va-tab-icon-margin-right);
    }

    &.va-tab--disabled {
      @include va-disabled();

      pointer-events: none;
    }
  }
</style>
