import React from "react";
import { connect } from "react-redux";

import Display from "../display/Display";
import Controls from "../controls/Controls";
import { toggleLocked, toggleClosed } from "../redux/actions/actionCreators";

class Dashboard extends React.Component {
  render() {
    const { closed, locked, toggleClosed, toggleLocked } = this.props;

    return (
      <>
        <Display locked={locked} closed={closed} />
        <Controls
          locked={locked}
          closed={closed}
          toggleLocked={toggleLocked}
          toggleClosed={toggleClosed}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    locked: state.locked,
    closed: state.closed
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleLocked: () => dispatch(toggleLocked()),
    toggleClosed: () => dispatch(toggleClosed())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
