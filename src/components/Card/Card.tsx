// import { FC, SyntheticEvent } from 'react';
// import classes from './Card.module.scss';
// import { PlanetCharacteristics } from '../../common/types/types';
// import { getIdFromUrl } from '../../common/utils/utils';
// import { Link } from 'react-router';

// interface ICardProps {
//   planet: PlanetCharacteristics;
//   setSelectedPlanetId: React.Dispatch<React.SetStateAction<number | null>>;
// }

// const Card: FC<ICardProps> = ({ planet, setSelectedPlanetId }) => {
//   const handleClick = (_event: SyntheticEvent) => {
//     const id = getIdFromUrl(planet.url);
//     setSelectedPlanetId(Number(id));
//   };

//   return (
//     <Link to={`/planets/${getIdFromUrl(planet.url)}`} onClick={handleClick}>
//       <div className={classes.card}>
//         <div className={classes.item}>
//           <div className={classes.col1}>{planet.name}</div>
//           <div className={classes.col2}>
//             <div className={classes.row}>
//               <div className={classes.rowCol1}>Rotation period</div>
//               <div className={classes.rowCol2}>{planet.rotationPeriod}</div>
//             </div>
//             <div className={classes.row}>
//               <div className={classes.rowCol1}>Orbital period</div>
//               <div className={classes.rowCol2}>{planet.orbitalPeriod}</div>
//             </div>
//             <div className={classes.row}>
//               <div className={classes.rowCol1}>Diameter</div>
//               <div className={classes.rowCol2}>{planet.diameter}</div>
//             </div>
//             <div className={classes.row}>
//               <div className={classes.rowCol1}>Climate</div>
//               <div className={classes.rowCol2}>{planet.climate}</div>
//             </div>
//             <div className={classes.row}>
//               <div className={classes.rowCol1}>Gravity</div>
//               <div className={classes.rowCol2}>{planet.gravity}</div>
//             </div>
//             <div className={classes.row}>
//               <div className={classes.rowCol1}>Surface water</div>
//               <div className={classes.rowCol2}>{planet.surfaceWater}</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };
// export default Card;
import { FC, SyntheticEvent } from 'react';
import classes from './Card.module.scss';
import { PlanetCharacteristics } from '../../common/types/types';
import { getIdFromUrl } from '../../common/utils/utils';
import { Link } from 'react-router'; // Импортируем Link из react-router-dom

interface ICardProps {
  planet: PlanetCharacteristics;
  setSelectedPlanetId: React.Dispatch<React.SetStateAction<number | null>>;
}

const Card: FC<ICardProps> = ({ planet, setSelectedPlanetId }) => {
  const handleClick = (_event: SyntheticEvent) => {
    const id = getIdFromUrl(planet.url);
    setSelectedPlanetId(Number(id));
  };

  return (
    <Link
      to={`/planets/${getIdFromUrl(planet.url)}`}
      onClick={handleClick}
      className={classes.cardLink}
    >
      {' '}
      {/* Добавляем класс cardLink для Link */}
      <div className={classes.cardVertical}>
        {' '}
        {/* Изменяем класс на cardVertical */}
        <div className={classes.cardContent}>
          {' '}
          {/* Оборачиваем контент в cardContent */}
          <div className={classes.planetNameSelect}>
            <div className={classes.planetName}>{planet.name}</div>{' '}
            <input type="checkbox" className={classes.checkbox} />{' '}
            {/* Класс для имени планеты */}
            {/* Класс для имени планеты */}
          </div>
          <div className={classes.planetDetails}>
            {' '}
            {/* Класс для деталей */}
            <div className={classes.detailRow}>
              <span className={classes.detailLabel}>Rotation period:</span>
              <span className={classes.detailValue}>
                {planet.rotationPeriod}
              </span>
            </div>
            <div className={classes.detailRow}>
              <span className={classes.detailLabel}>Orbital period:</span>
              <span className={classes.detailValue}>
                {planet.orbitalPeriod}
              </span>
            </div>
            <div className={classes.detailRow}>
              <span className={classes.detailLabel}>Diameter:</span>
              <span className={classes.detailValue}>{planet.diameter}</span>
            </div>
            <div className={classes.detailRow}>
              <span className={classes.detailLabel}>Climate:</span>
              <span className={classes.detailValue}>{planet.climate}</span>
            </div>
            <div className={classes.detailRow}>
              <span className={classes.detailLabel}>Gravity:</span>
              <span className={classes.detailValue}>{planet.gravity}</span>
            </div>
            <div className={classes.detailRow}>
              <span className={classes.detailLabel}>Surface water:</span>
              <span className={classes.detailValue}>{planet.surfaceWater}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
