// import { ChangeEvent, Component } from 'react';

// interface SearchFieldProps {
//   onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
//   searchValue: string;
// }

// export default class SearchField extends Component<SearchFieldProps> {
//   render() {
//     return (
//       <input
//         type="text"
//         placeholder="Search"
//         value={this.props.searchValue}
//         onChange={this.props.onInputChange}
//       />
//     );
//   }
// }
import { ChangeEvent, FC } from 'react';

interface SearchFieldProps {
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
}

const SearchField: FC<SearchFieldProps> = ({ onInputChange, searchValue }) => {
  return (
    <input
      type="text"
      placeholder="Search"
      value={searchValue}
      onChange={onInputChange}
    />
  );
};

export default SearchField;
