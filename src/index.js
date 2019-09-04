async function module() {
  const { Component, h, render } = await dependency('preact')

  class Clock extends Component {
      getDateFromTime(time) {
        typed(int, time);

        return typed(string, new Date(time).toLocaleTimeString())
      }

      render() {
          let time = this.getDateFromTime(Date.now());

          return h('span', null, time);
      }
  }
  
  render(h(Clock), document.body);
}

module();
