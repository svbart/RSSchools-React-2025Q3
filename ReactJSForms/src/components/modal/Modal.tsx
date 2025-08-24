import { createPortal } from 'react-dom';
import { useEffect, type FC, type ReactNode } from 'react';
import classes from './Modal.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  container: HTMLDivElement | null;
  title: string;
}

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  container,
  title,
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen || !container) return null;

  return createPortal(
    <div className={classes.modal} onClick={onClose}>
      <div
        className={classes.modalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="close-button">&times;</span>
        <h2>{title}</h2>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root') as HTMLElement
  );
};
export default Modal;
