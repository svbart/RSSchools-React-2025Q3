import { ChangeEvent, Component } from 'react';

interface SearchFieldProps {
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
}

export default class SearchField extends Component<SearchFieldProps> {
  // constructor(props: any) {
  //   super(props);
  // }

  render() {
    return (
      <input
        type="text"
        placeholder="Search"
        value={this.props.searchValue}
        onChange={this.props.onInputChange}
      />
    );
  }
}
