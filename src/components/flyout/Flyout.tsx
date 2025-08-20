import { useTranslations, useLocale } from 'next-intl';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deleteAllSelectedItems } from '../../store/storeSlices/app-reducer';
import { getPlanetCountText } from '../../common/utils/utils';
import DownloadBtn from '../downloadSelectedItems/DownloadBtn';
import classes from './Flyout.module.scss';

const Flyout = () => {
  const t = useTranslations('flyout');
  const locale = useLocale();
  const { selectedItems } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  const handleUnselectAll = () => {
    dispatch(deleteAllSelectedItems());
  };

  if (selectedItems.length)
    return (
      <div className={classes.flyout} data-theme-element="true">
        <p className={classes.flyoutText}>
          {locale === 'ru'
            ? `${getPlanetCountText(selectedItems.length, locale)} ${selectedItems.length === 1 ? t('selected_one') : t('selected_many')}`
            : `${getPlanetCountText(selectedItems.length, locale)} ${t('selected')}`}
        </p>
        <button onClick={handleUnselectAll} className={classes.unselectBtn}>
          {t('unselectAll')}
        </button>
        <DownloadBtn />
      </div>
    );
};
export default Flyout;
