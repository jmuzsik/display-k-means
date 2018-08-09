// tslint:disable:no-console

import * as React from 'react';
import './App.css';

import * as clusterMaker from 'clusters';

import { CartesianGrid, Scatter, ScatterChart, XAxis, YAxis } from 'recharts';

import Utils from './utils';

interface IMyComponentState {
  centroidLocations: any;
  dataPointsPerCluster: any;
}

class App extends React.Component<{}, IMyComponentState> {
  constructor(props: any) {
    super(props);
    // first step is to that user puts the points, 
    // this is fucking simple, just check the onClick 
    // method attached to the initial chart and add 
    // points correspondingly, simultaneously store those values immidiately
    const dataPoints = Utils.createDataPoints();
    // this is inputted by the user, all i need is the number
    const centroidAmount: number = 3;
    // this number is set as so:
    clusterMaker.k(centroidAmount);
    // this is where the animation stems from, i need to 
    // progressively run more and more iterations, and i
    // ought to do this by constantly setting the data as
    // the current points so that i continually call the
    // function like below but with the progressively
    // altering values used.
    clusterMaker.iterations(10);
    // and the dataPoints spoken of prior:
    clusterMaker.data(dataPoints);
    const clusters: any = clusterMaker.clusters();
    // otherwise all of this happens afterwards in the same way.
    const centroidLocations: any = clusters.map((cluster: any) => {
      return {
        x: cluster.centroid[0],
        y: cluster.centroid[1]
      };
    });
    const dataPointsPerCluster: number[][] = [];
    for (let i = 0; i < centroidAmount; i++) {
      const clusterDataPoints: number[] = clusters[i].points.map(
        (dataPoint: number[]) => {
          return {
            x: dataPoint[0],
            y: dataPoint[1]
          };
        }
      );
      dataPointsPerCluster.push(clusterDataPoints);
    }
    this.state = {
      centroidLocations,
      dataPointsPerCluster
    };

    this.checkPoint = this.checkPoint.bind(this);
  }

  public checkPoint(e: any) {
    console.log(e);
  }

  public createCharts() {
    // const colors: string[] = ['#c2d3d1', '#d9f441', '#f4ee41'];
    // const charts: JSX.Element[] = this.state.dataPointsPerCluster.map(
    //   (cluster: number[][], i: number) => {
    //     return (
    //       <ScatterChart
    //         className="absolute-position"
    //         key={i}
    //         width={1000}
    //         height={1000}
    //       >
    //         <CartesianGrid />
    //         <XAxis domain={[-2000, 2000]} dataKey={'x'} type="number" />
    //         <YAxis domain={[-2000, 2000]} dataKey={'y'} type="number" />
    //         <Scatter data={cluster} fill={colors[i]} />
    //       </ScatterChart>
    //     );
    //   }
    // );
    // const chartLen: number = charts.length;
    console.log(this.state.dataPointsPerCluster, this.state.centroidLocations);
    const clusterChart: JSX.Element = (
      <ScatterChart
        onClick={this.checkPoint}
        className="absolute-position"
        key={1}
        width={1000}
        height={1000}
      >
        <CartesianGrid />
        <XAxis domain={[-2000, 2000]} dataKey={'x'} type="number" name="x" />
        <YAxis domain={[-2000, 2000]} dataKey={'y'} type="number" name="y" />
        <Scatter
          name="K-Means"
          data={this.state.centroidLocations}
          fill="red"
        />
      </ScatterChart>
    );
    // const concatted: any = charts.concat(clusterChart);
    return clusterChart;
  }
  public render() {
    return (
      <React.Fragment>
        <div>{this.state.dataPointsPerCluster && this.createCharts()}</div>
      </React.Fragment>
    );
  }
}

export default App;
