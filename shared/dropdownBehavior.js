function dropdownBehavior() {
  return {
    wrapper: {
      ['@keydown.window.escape']() {
        this.open = false
      },
      ['@click.away']() {
        this.open = false
      }
    },
    trigger: {
      ['@click']() {
        this.open = !this.open
      },
      ['x-bind:aria-expanded']() {
        return this.open
      }
    },
    menu: {
      ['x-show']() {
        return this.open
      }
    }
  }
}