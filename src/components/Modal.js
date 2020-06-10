import React, { Component } from "react";
import { Modal } from "antd";
import { renderMovieDetails } from "./MovieDetails";
import { LoadingOutlined } from "@ant-design/icons";

class ModalComponent extends Component {
  handleCancel = () => {
    this.props.modalCallback();
  };

  render() {
    const { visible, movieDetails, loading = true } = this.props;
    return (
      <div>
        <Modal
          title="Movie details"
          visible={visible}
          onCancel={this.handleCancel}
          footer={null}
          width={330}
        >
          {loading ? (
            <LoadingOutlined
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "200px"
              }}
            />
          ) : (
            movieDetails && renderMovieDetails(movieDetails)
          )}
        </Modal>
      </div>
    );
  }
}

export default ModalComponent;
