import classes from './ResultsList.module.scss';
import { PlanetCharacteristics } from '../../common/types/types';
import Card from '../card/Card';
import { FC } from 'react';

interface ResultsListProps {
  planets: PlanetCharacteristics[];
  handlePlanetSelect: (planetId: number) => void;
}

const ResultsList: FC<ResultsListProps> = ({ planets, handlePlanetSelect }) => {
  return (
    <div className={classes.ResultsList}>
      {planets.length ? (
        planets.map((planet, index) => {
          return (
            <Card
              key={index}
              planet={planet}
              handlePlanetSelect={handlePlanetSelect}
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
