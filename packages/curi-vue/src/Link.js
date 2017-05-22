const Link = {
  name: 'curi-link',

  props: ['to', 'params', 'details'],

  computed: {
    location: function() {
      const pathname = this.$curi.addons.pathname(this.to, this.params);
      return { pathname, ...this.details };
    },
    href: function() {
      return this.$curi.history.createHref(this.location);
    }
  },

  methods: {
    click: function(event) {
      event.preventDefault();
      this.$curi.history.push(this.location);
    }
  },

  render: function(h) {
    return h('a', {
        href: this.href,
        on: {
          click: this.click
        }
      },
      this.$slots.default
    );
  }
};

export default Link;
