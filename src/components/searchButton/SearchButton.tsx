import { Component, SyntheticEvent } from 'react';

interface SearchButtonProps {
  onButtonClick: (event: SyntheticEvent) => void;
}

export default class SearchButton extends Component<SearchButtonProps> {
  render() {
    return <button onClick={this.props.onButtonClick}>Search</button>;
  }
}
