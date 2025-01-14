import React from "react";

interface ChangingProgressProviderProps {
  interval?: number;
  values: number[];
  children: (value: number) => React.ReactNode;
}

interface ChangingProgressProviderState {
  valuesIndex: number;
}

class ChangingProgressProvider extends React.Component<
  ChangingProgressProviderProps,
  ChangingProgressProviderState
> {
  static defaultProps = {
    interval: 1000,
  };

  state: ChangingProgressProviderState = {
    valuesIndex: 0,
  };

  intervalId: number | undefined;

  componentDidMount() {
    this.intervalId = window.setInterval(() => {
      this.setState({
        valuesIndex: (this.state.valuesIndex + 1) % this.props.values.length,
      });
    }, this.props.interval);
  }

  componentWillUnmount() {
    window.clearInterval(this.intervalId);
  }

  render() {
    return this.props.children(this.props.values[this.state.valuesIndex]);
  }
}

export default ChangingProgressProvider;
