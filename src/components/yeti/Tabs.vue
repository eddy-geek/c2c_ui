<template>
  <div class="column pb-0 mb-0 tabs is-boxed yetitabs">
    <ul role="tablist">
      <li v-for="(tab, i) in tabs" role="presentation" :key="tab" :class="{ 'is-active': activeTab === i }">
        <a
          class="yetitabs-link"
          role="tab"
          :href="'#panel' + i"
          :id="'tab' + i"
          ref="tab"
          :aria-selected="activeTab === i"
          :tabindex="activeTab === i ? false : -1"
          @click.prevent="setActiveTab(i)"
          @keydown="setActiveTabKeyboard($event, i)"
        >
          {{ tab }}
          <fa-icon icon="check-circle" v-if="i === 1 && hasFeatures && !validSimplifyTolerance" class="ml-1" />
          <fa-icon
            icon="exclamation-circle"
            v-if="i === 1 && validSimplifyTolerance"
            class="has-text-danger ml-1"
            :title="$gettext('Not simplified yet')"
          />
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import Yetix from '@/components/yeti/Yetix';

export default {
  props: {
    tabs: {
      type: Array,
      required: true,
    },
  },
  computed: {
    activeTab() {
      return Yetix.activeTab;
    },
    hasFeatures() {
      return Yetix.hasFeatures;
    },
    validSimplifyTolerance() {
      return Yetix.validSimplifyTolerance;
    },
  },
  methods: {
    setActiveTab(index) {
      // focus active tab
      this.$refs.tab[index].focus();
      // then set
      Yetix.setActiveTab(index);
    },
    setActiveTabKeyboard(event, index) {
      // Set arrow keys: left/right = switch active tabs / down = focus panel
      const ARROW_LEFT = 37;
      const ARROW_RIGHT = 39;
      const ARROW_DOWN = 40;
      let dir =
        event.which === ARROW_LEFT
          ? index - 1
          : event.which === ARROW_RIGHT
          ? index + 1
          : event.which === ARROW_DOWN
          ? 'down'
          : null;

      if (dir !== null) {
        event.preventDefault();

        // If the down key is pressed, move focus to the open panel,
        // otherwise switch to the adjacent tab
        dir === 'down'
          ? this.$parent.$refs['panel' + index].$el.focus()
          : this.tabs[dir]
          ? this.setActiveTab(dir)
          : void 0;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.yetitabs {
  margin: 0 0 0 -1px !important;
  overflow: visible;

  &-link {
    font-size: 0.9em;
    padding: 0.25em 1em;
  }

  li,
  a {
    height: 100%;
  }

  li {
    margin-right: 1px;
  }
}
</style>
