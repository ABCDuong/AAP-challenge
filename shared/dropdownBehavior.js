function dropdownBehavior() {
  return {
    open: false,
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
      },
      ['@click']() {
        this.open = false;
      }
    }
  }
}