import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { loadExtensionListingColumns } from 'console/state/extensions/actions';

@connect(
  null,
  {
    loadExtensionListingColumns,
  },
)
class QueryExtensionListingColumns extends React.PureComponent {
  static propTypes = {
    loadExtensionListingColumns: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.loadExtensionListingColumns();
  }

  render() {
    return null;
  }
}

export default QueryExtensionListingColumns;
