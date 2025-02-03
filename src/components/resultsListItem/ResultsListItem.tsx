import { Component } from 'react';
import classes from './ResultsListItem.module.scss';
import { PlanetCharacteristics } from '../../common/types/types';
export default class ResultsListItem extends Component<PlanetCharacteristics> {
  render() {
    return (
      <div className={classes.ResultsListItem}>
        <div className={classes.item}>
          <div className={classes.col1}>{this.props.name}</div>
          <div className={classes.col2}>
            <div className={classes.row}>
              <div className={classes.rowCol1}>Rotation period</div>
              <div className={classes.rowCol2}>{this.props.rotationPeriod}</div>
            </div>
            <div className={classes.row}>
              <div className={classes.rowCol1}>Orbital period</div>
              <div className={classes.rowCol2}>{this.props.orbitalPeriod}</div>
            </div>
            <div className={classes.row}>
              <div className={classes.rowCol1}>Diameter</div>
              <div className={classes.rowCol2}>{this.props.diameter}</div>
            </div>
            <div className={classes.row}>
              <div className={classes.rowCol1}>Climate</div>
              <div className={classes.rowCol2}>{this.props.climate}</div>
            </div>
            <div className={classes.row}>
              <div className={classes.rowCol1}>Gravity</div>
              <div className={classes.rowCol2}>{this.props.gravity}</div>
            </div>
            <div className={classes.row}>
              <div className={classes.rowCol1}>Terrain</div>
              <div className={classes.rowCol2}>{this.props.terrain}</div>
            </div>
            <div className={classes.row}>
              <div className={classes.rowCol1}>Surface water</div>
              <div className={classes.rowCol2}>{this.props.surfaceWater}</div>
            </div>
            <div className={classes.row}>
              <div className={classes.rowCol1}>Population</div>
              <div className={classes.rowCol2}>{this.props.population}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
