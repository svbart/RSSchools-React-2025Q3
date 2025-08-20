import { fetchPlanetById } from '../../app/lib/planetsApi';
import { getTranslations } from 'next-intl/server';
import CloseItemDetailsButton from '../closeItemDetailsButton/closeItemDetailsButton';
import classes from './ItemDetailsCard.module.scss';

interface ItemDetailsServerProps {
  planetId: number;
}

// Серверный компонент, который получает данные и отображает их
export default async function ItemDetailsServer({
  planetId,
}: ItemDetailsServerProps) {
  const t = await getTranslations('planet');

  try {
    const planetData = await fetchPlanetById(planetId);

    if (!planetData) {
      return (
        <div role="alert" style={{ color: 'red', padding: '16px' }}>
          Planet not found
        </div>
      );
    }

    return (
      <>
        <div className={classes.details} data-theme-element="true">
          <div className={classes.detailsHeader} data-theme-element="true">
            Details <CloseItemDetailsButton />
          </div>
        </div>
        <div className={classes.detailsContent} data-theme-element="true">
          <div>
            {t('name')}: {planetData.name}
          </div>
          <div>
            {t('population')}: {planetData.population}
          </div>
          <div>
            {t('terrain')}: {planetData.terrain}
          </div>
          <div>
            {t('climate')}: {planetData.climate}
          </div>
          <div>
            {t('gravity')}: {planetData.gravity}
          </div>
          <div>
            {t('diameter')}: {planetData.diameter}
          </div>
        </div>
      </>
    );
  } catch (error) {
    console.error('Error fetching planet:', error);
    return (
      <div role="alert" style={{ color: 'red', padding: '16px' }}>
        Error loading planet data
      </div>
    );
  }
}
