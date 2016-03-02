'use babel';
/* @flow */

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import {
  PureRenderMixin,
  React,
} from 'react-for-atom';

type Props = {
  checked: boolean;
  indeterminate: boolean;
  label: string;
  onChange: (isChecked: boolean) => mixed;
};

/**
 * A checkbox component with an input checkbox and a label. We restrict the label to a string
 * to ensure this component is pure.
 */
export default class NuclideCheckbox extends React.Component {
  props: Props;

  static defaultProps = {
    indeterminate: false,
  };

  constructor(props: Object) {
    super(props);
    (this: any)._onChange = this._onChange.bind(this);
  }

  shouldComponentUpdate(nextProps: Object, nextState: void): boolean {
    return PureRenderMixin.shouldComponentUpdate.call(this, nextProps, nextState);
  }

  render(): ReactElement {
    return (
      <label className="nuclide-ui-checkbox-label">
        <input
          checked={this.props.checked}
          className="nuclide-ui-checkbox"
          indeterminate={this.props.indeterminate}
          onChange={this._onChange}
          type="checkbox"
        />
        {' '}{this.props.label}
      </label>
    );
  }

  _onChange(event: SyntheticEvent) {
    const isChecked = ((event.target: any): HTMLInputElement).checked;
    this.props.onChange.call(null, isChecked);
  }
}
