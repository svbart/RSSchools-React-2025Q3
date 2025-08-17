import classes from './ErrorBoundaryFallback.module.scss';

const ErrorBoundaryFallback = () => (
  <div className={classes.errorMessageContainer}>
    <div className={classes.errorMessage}>
      Something went wrong! Try again later
    </div>
  </div>
);

export default ErrorBoundaryFallback;
