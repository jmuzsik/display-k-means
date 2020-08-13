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
  show: boolean;
}

class App extends React.Component<{}, IMyComponentState> {
  constructor(props: any) {
    super(props);
    this.state = {
      kValue: 0,
      numberOfPoints: 0,
      show: false
    };
    this.updateNumberOfPoints = this.updateNumberOfPoints.bind(this);
    this.setShow = this.setShow.bind(this);
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

  public setShow() {
    this.setState({show: !this.state.show})
  }

  public render() {
    return (
      <React.Fragment>
        <div className="header">
          <h1 className="header-text">K-Means Visualisation</h1>
          <div className="dropdown">
            <button type="button" onClick={this.setShow}>Show Information</button>
            {this.state.show && (
              <div className="content"> 
                <p>k-means clustering is a method of vector quantization, originally from signal processing, that aims to partition n observations into k clusters in which each observation belongs to the cluster with the nearest mean (cluster centers or cluster centroid), serving as a prototype of the cluster.</p>
                <p>Instructions</p>
                <ul>
                  <li>
                    Click anywhere in the grid to add data-points.
                  </li>
                  <li>
                    Input the amount of clusters (or centroids) that the points will be partitioned into.
                  </li>
                </ul>
              </div>
            )}
          </div>
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
