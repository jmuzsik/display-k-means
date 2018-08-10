// tslint:disable:no-console

import * as React from 'react';
import './App.css';

import Chart from './Components/Chart';
import Form from './Components/Form';

/**
 * @interface
 * @type {kValue} this is amount of centroids
 * @type {numberOfPoints} amount of points on chart
 */
interface IMyComponentState {
  kValue: number;
  numberOfPoints: number;
}

class App extends React.Component<{}, IMyComponentState> {
  constructor(props: any) {
    super(props);
    this.state = {
      kValue: 0,
      numberOfPoints: 0
    };
    this.updateNumberOfPoints = this.updateNumberOfPoints.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * pass run function data to chart
   * @method
   * @param {event} e - The onSubmit event
   */
  public onSubmit(num: number) {
    this.setState({ kValue: num });
  }

  /**
   * run when new points are added to the chart
   * @method
   * @param {num} number - amount of points on chart
   */
  public updateNumberOfPoints(num: number) {
    this.setState({ numberOfPoints: num });
  }

  public render() {
    return (
      <React.Fragment>
        <div className="header">
          <h1 className="header-text">K-Means Visualisation</h1>
        </div>
        <Chart
          updateNumberOfPoints={this.updateNumberOfPoints}
          kValue={this.state.kValue}
        />
        <Form
          numberOfPoints={this.state.numberOfPoints}
          onSubmit={this.onSubmit}
        />
      </React.Fragment>
    );
  }
}

export default App;
