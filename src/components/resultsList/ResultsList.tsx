// import { Component } from 'react';
// import ResultsListItem from '../resultsListItem/ResultsListItem';
// import { PlanetCharacteristics } from '../../common/types/types';
// import classes from './ResultsList.module.scss';

// interface ResultsListProps {
//   planets: PlanetCharacteristics[];
// }

// export default class ResultsList extends Component<ResultsListProps> {
//   render() {
//     return (
//       <div className={classes.ResultsList}>
//         <div className={classes.header}>
//           <div className={classes.col1}>Planet Name</div>
//           <div className={classes.col2}>Planet Characteristics</div>
//         </div>
//         {this.props.planets.length ? (
//           this.props.planets.map((planet, index) => {
//             return <ResultsListItem key={index} {...planet} />;
//           })
//         ) : (
//           <div className={classes.noResults}>No results</div>
//         )}
//       </div>
//     );
//   }
// }
import { FC } from 'react';
import ResultsListItem from '../resultsListItem/ResultsListItem';
import { PlanetCharacteristics } from '../../common/types/types';
import classes from './ResultsList.module.scss';

interface ResultsListProps {
  planets: PlanetCharacteristics[];
  // setSelectedPlanetId: React.Dispatch<React.SetStateAction<number | null>>;
}

const ResultsList: FC<ResultsListProps> = ({
  planets,
  // setSelectedPlanetId,
}) => {
  return (
    <div className={classes.ResultsList}>
      <div className={classes.header}>
        <div className={classes.col1}>Planet Name</div>
        <div className={classes.col2}>Planet Characteristics</div>
      </div>
      {planets.length ? (
        planets.map((planet, index) => {
          return (
            <ResultsListItem
              key={index}
              {...planet}
              // setSelectedPlanetId={setSelectedPlanetId}
            />
          );
        })
      ) : (
        <div className={classes.noResults}>No results</div>
      )}
    </div>
  );
};
export default ResultsList;
