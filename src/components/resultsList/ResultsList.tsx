import { FC } from 'react';
import ResultsListItem from '../resultsListItem/ResultsListItem';
import { PlanetCharacteristics } from '../../common/types/types';
import classes from './ResultsList.module.scss';

interface ResultsListProps {
  planets: PlanetCharacteristics[];
  setSelectedPlanetId: React.Dispatch<React.SetStateAction<number | null>>;
}

const ResultsList: FC<ResultsListProps> = ({
  planets,
  setSelectedPlanetId,
}) => {
  return (
    <div className={classes.ResultsList}>
      {planets.length ? (
        planets.map((planet, index) => {
          return (
            <ResultsListItem
              key={index}
              planet={planet}
              setSelectedPlanetId={setSelectedPlanetId}
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
