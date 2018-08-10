// tslint:disable:no-console

import * as React from 'react';
import './Chart.css';

import {
  happy,
  ill,
  kiss,
  nerd,
  ninja,
  smart,
  smiling,
  surprised,
  suspicious,
  tongueOut,
  wink
} from '../emojis';

import {
  CartesianGrid,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

import * as clusterMaker from 'clusters';

/**
 * @interface
 * @type {chart} chart is the displayed scatterChart
 * @type {chartPoints} the points formatted to be rendered by the chart
 * @type {initalRender} this is the chart that renders prior to pressing run command
 * @type {points} the points that are unformatted for running the algorithm
 * @type {centroidLocations} these are the points that are solely related to centroids
 * @type {dataPointsPerCluster} the points that are connected to each cluster in a multi-dimensional array
 */
interface IMyComponentState {
  chart?: JSX.Element;
  chartPoints: any[][];
  initialRender: boolean;
  points: number[][];
  centroidLocations: any;
  dataPointsPerCluster: any;
}
/**
 * @interface
 * @type {kValue} this is passed from form component for amount of centroids
 * @type {updateNumberOfPoints} this passes the amount of points added to chart, user needs 10 points to press run
 *
 * @function updateNumberOfPoints
 * @param {number} num - this is the amount of points on chart atm
 * @return {void}
 */

interface IMyComponentProps {
  kValue: number;
  updateNumberOfPoints: (num: number) => void;
}

export default class Chart extends React.Component<
  IMyComponentProps,
  IMyComponentState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      centroidLocations: [],
      chartPoints: [],
      dataPointsPerCluster: [],
      initialRender: true,
      points: []
    };
    this.checkPoint = this.checkPoint.bind(this);
    this.createScatterPoints = this.createScatterPoints.bind(this);
    this.createChart = this.createChart.bind(this);
  }

  /**
   * This is the onClick function of the chart, when this is called it adds the point to the chart.
   * @method
   * @param {event} e - The onClick event
   */
  public checkPoint = (e: any) => {
    // chartPoints relate
    const chartPoints: any[] = this.state.chartPoints;
    const points: number[][] = this.state.points;
    chartPoints.push({ x: e.xValue, y: e.yValue });
    points.push([e.xValue, e.yValue]);
    this.setState({
      chartPoints,
      points
    });
    // passed to parent container to work with form component
    this.props.updateNumberOfPoints(points.length);
  };

  /**
   * recieves form input to trigger the running of the algorithm
   * @method
   * @param {props} any - The object recieved from parent containing amount of centroids
   */
  public componentWillReceiveProps(props: any) {
    if (props.kValue > 0) {
      this.createClusters(props.kValue);
      this.setState({
        chart: this.createChart(),
        initialRender: false
      });
    }
  }

  /**
   * This is the function that runs the k-means algorithm on chart data
   * @public
   * @method
   * @param {kValue} number - amount of centroids
   */
  public createClusters(kValue: number) {
    // amount of centroids - k
    clusterMaker.k(kValue);
    // amount of times to run k-means algorithm with points
    clusterMaker.iterations(1000);

    // add points to constructor
    clusterMaker.data(this.state.points);

    const clusters: any = clusterMaker.clusters();

    // first grab all the centroids and their location
    const centroidLocations: any = clusters.map((cluster: any) => {
      return {
        x: cluster.centroid[0],
        y: cluster.centroid[1]
      };
    });
    // then create the dataPoints corresponding to each centroid
    const dataPointsPerCluster: number[][] = [];
    for (let i = 0; i < kValue; i++) {
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
    this.setState({
      centroidLocations,
      dataPointsPerCluster
    });
  }

  /**
   * creation of the chart to be rendered
   * @public
   * @method
   */
  public createChart() {
    return (
      <ScatterChart
        key={Math.random()}
        onClick={this.checkPoint}
        width={1000}
        height={1000}
      >
        <CartesianGrid />
        <XAxis domain={[-100, 100]} dataKey={'x'} type="number" />
        <YAxis domain={[-100, 100]} dataKey={'y'} type="number" />
        {this.createScatterPoints()}
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
      </ScatterChart>
    );
  }

  /**
   * creation of points on the chart, each individual cluster specifically
   * @public
   * @method
   */
  public createScatterPoints() {
    if (this.state.initialRender) {
      return (
        <Scatter
          key={Math.random()}
          data={this.state.chartPoints}
          shape={suspicious}
        />
      );
    }
    const emojis: JSX.Element[] = [
      ill,
      kiss,
      surprised,
      ninja,
      tongueOut,
      nerd,
      smart,
      smiling,
      suspicious,
      wink,
      happy
    ];
    const centroidPoints: JSX.Element = (
      <Scatter
        key={Math.random()}
        name="K-Means"
        data={this.state.centroidLocations}
        shape={tongueOut}
      />
    );
    // put centroid points first
    let chartData: JSX.Element[] = [centroidPoints];
    // then rest of points
    const dataPoints: JSX.Element[] = this.state.dataPointsPerCluster.map(
      (cluster: number[][], i: number) => {
        if (i > 10) {
          return (
            <Scatter
              key={Math.random()}
              data={cluster}
              shape={emojis[i - 10]}
            />
          );
        }
        return <Scatter key={Math.random()} data={cluster} shape={emojis[i]} />;
      }
    );
    chartData = chartData.concat(dataPoints);
    return chartData;
  }

  public render() {
    return <React.Fragment>{this.createChart()}</React.Fragment>;
  }
}
