'use client';

import { useTranslations } from 'next-intl';
import { getNumberOfSelectedItems } from '../../common/utils/utils';
import { useAppSelector } from '../../store/hooks';
import { downloadCSVAction } from '../../app/actions/csvActions';
import classes from './DownloadBtn.module.scss';

const DownloadBtn = () => {
  const t = useTranslations('download');
  const { selectedItems } = useAppSelector((state) => state.app);

  const handleDownloadCSV = async () => {
    if (selectedItems.length === 0) return;

    try {
      const csvContent = await downloadCSVAction(selectedItems);
      const filename = `${getNumberOfSelectedItems(selectedItems.length)}.csv`;

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading CSV:', error);
    }
  };

  return (
    <button
      className={classes.flyoutBtn}
      onClick={handleDownloadCSV}
      disabled={selectedItems.length === 0}
    >
      {t('csv')}
    </button>
  );
};

export default DownloadBtn;
