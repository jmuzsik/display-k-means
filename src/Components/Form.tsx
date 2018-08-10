// tslint:disable:no-console

import * as React from 'react';
import './Form.css';

/**
 * @interface
 * @type {kValue} this is amount of centroids
 * @type {disabled} to be able to press run command
 */
interface IMyComponentState {
  kValue: number;
  disabled: boolean;
}

/**
 * @interface
 * @type {onSubmit} press of run command
 * @type {numberOfPoints} passed from the chart component, cannot press run until at least 10 points
 *
 * @function obSubmit
 * @param {e} any - when run is pressed
 * @return {void}
 */
interface IMyComponentProps {
  onSubmit: (e: any) => void;
  numberOfPoints: number;
}

export default class Form extends React.PureComponent<
  IMyComponentProps,
  IMyComponentState
> {
  constructor(props: any) {
    super(props);
    this.state = { kValue: 0, disabled: true };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * handle change works in relation to changing amount of centroids (k)
   * @method
   * @param {event} e - The onChange event
   */
  public handleChange(e: any) {
    let disabled: boolean = true;
    if (this.props.numberOfPoints > 9 && e.target.value > 0) {
      disabled = false;
    }
    this.setState({ kValue: Number(e.target.value), disabled });
  }

  /**
   * Checks if numberOfPoints is greater then 9 to see if run can be pressed
   * @method
   */
  public componentDidUpdate() {
    if (this.props.numberOfPoints > 9 && this.state.kValue > 0) {
      this.setState({ disabled: false });
    }
  }

  /**
   * press run in form
   * @method
   * @param {event} e - The onChange event
   */
  public handleSubmit(e: any) {
    e.preventDefault();
    this.props.onSubmit(this.state.kValue);
  }

  public render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <label>
          Centroids:
          <input
            type="number"
            value={this.state.kValue}
            onChange={this.handleChange}
          />
        </label>
        <button disabled={this.state.disabled} type="submit" value="Submit">
          Run
        </button>
      </form>
    );
  }
}
