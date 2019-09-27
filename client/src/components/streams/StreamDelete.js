import React from "react";
import Modal from "../Modal";
import history from "../../history";
import { connect } from "react-redux";
import { deleteStream, fetchStream } from "../../actions";
import { Link } from "react-router-dom";

class StreamDelete extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchStream(id);
  }

  renderActions = () => {
    const id = this.props.match.params.id;
    return (
      <React.Fragment>
        <button
          className="ui button negative"
          onClick={() => this.props.deleteStream(id)}
        >
          confirm
        </button>
        <Link className="ui button" to="/">
          cancle
        </Link>
      </React.Fragment>
    );
  };

  renderContent = () => {
    if (!this.props.stream) {
      return "Are you sure you want to delete this stream?";
    }
    return `Are you sure you want to delete the stream: ${this.props.stream.title}`;
  };

  render() {
    return (
      <Modal
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push("/")}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(
  mapStateToProps,
  { fetchStream, deleteStream }
)(StreamDelete);
