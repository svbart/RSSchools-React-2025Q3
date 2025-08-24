import { useEffect, useRef, useState } from 'react';
import classes from './MainPage.module.scss';
import Modal from '../../components/modal/Modal';
import ModalOpeningButton from '../../components/ModalOpeningButton/ModalOpeningButton';
import UncontrolledForm from '../../components/uncontrolledForm/UncontrolledForm';
import { useAppSelector } from '../../store/hooks';
import type { FormEntry } from '../../store/storeSlices/formDataReducer';

const MainPage = () => {
  const [isControlledOpen, setIsControlledOpen] = useState(false);
  const [isUncontrolledOpen, setIsUncontrolledOpen] = useState(false);
  const [newEntryId, setNewEntryId] = useState<string | null>(null);
  const modalRootRef = useRef<HTMLDivElement>(null);
  const entries = useAppSelector((state) => state.formData.entries);

  useEffect(() => {
    if (newEntryId) {
      const timer = setTimeout(() => setNewEntryId(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [newEntryId]);

  useEffect(() => {
    if (entries.length > 0) {
      const latestEntry = entries[entries.length - 1];
      setNewEntryId(latestEntry.id);
    }
  }, [entries.length]);

  const onControlledOpen = () => {
    console.log('Controlled Modal opened');
    setIsControlledOpen(true);
  };
  const onUncontrolledOpen = () => {
    console.log('Uncontrolled Modal opened');
    setIsUncontrolledOpen(true);
  };

  return (
    <>
      <h1 className={classes.header}>React Forms with Portals</h1>
      <div className={classes.container}>
        <ModalOpeningButton
          onClick={onUncontrolledOpen}
          btnName="Open Uncontrolled Modal"
        />

        <ModalOpeningButton
          onClick={onControlledOpen}
          btnName="Open Controlled Modal"
        />
      </div>
      <Modal
        isOpen={isUncontrolledOpen}
        onClose={() => setIsUncontrolledOpen(false)}
        container={modalRootRef.current}
        title="Uncontrolled Form"
      >
        <UncontrolledForm onClose={() => setIsUncontrolledOpen(false)} />
      </Modal>
      <Modal
        isOpen={isControlledOpen}
        onClose={() => setIsControlledOpen(false)}
        container={modalRootRef.current}
        title="Controlled Form"
      >
        <p>Modal Content</p>
      </Modal>

      <div ref={modalRootRef}></div>
      <div className={classes.tilesContainer}>
        {entries.map((entry: FormEntry) => (
          <div
            key={entry.id}
            className={`${classes.tile} ${entry.id === newEntryId ? classes.highlighted : ''}`}
          >
            <h3 className={classes.tileTitle}>{entry.name}</h3>
            <p>Age: {entry.age}</p>
            <p>Email: {entry.email}</p>
            <p>Gender: {entry.gender}</p>
            <p>Country: {entry.country}</p>
            {entry.pictureBase64 && (
              <img
                src={entry.pictureBase64}
                alt="Uploaded picture"
                className={classes.tileImage}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default MainPage;
