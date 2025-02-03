import { Component, SyntheticEvent } from 'react';

export default class CreateErrorButton extends Component {
  state = {
    hasError: false,
  };

  handelClick = (_event: SyntheticEvent) => {
    this.setState({ hasError: true });
  };

  render() {
    if (this.state.hasError) {
      throw new Error('An error occurred');
    }
    return <button onClick={this.handelClick}>Throw Error!</button>;
  }
}
