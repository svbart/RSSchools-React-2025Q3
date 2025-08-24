import { useRef, useState } from 'react';
import classes from './MainPage.module.scss';
import Modal from '../../components/modal/Modal';
import ModalOpeningButton from '../../components/ModalOpeningButton/ModalOpeningButton';
import UncontrolledForm from '../../components/uncontrolledForm/UncontrolledForm';

// interface LayoutProps {
//   children: ReactNode | ReactNode[];
// }
const MainPage = () => {
  const [isControlledOpen, setIsControlledOpen] = useState(false);
  const [isUncontrolledOpen, setIsUncontrolledOpen] = useState(false);
  const modalRootRef = useRef<HTMLDivElement>(null);

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
        <p>Modal Content</p>
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
    </>
  );
};

export default MainPage;
