import React, { Component } from "react";
import { Modal, Input, DatePicker } from "antd";

class ModalComponent extends Component {
  state = {
    confirmLoading: false
  };

  handleOk = () => {
    this.setState({
      confirmLoading: true
    });
    setTimeout(() => {
      this.props.handleOk();
      this.props.modalCallback();
      this.setState({
        confirmLoading: false
      });
    }, 1000);
  };

  handleCancel = () => {
    this.props.modalCallback();
  };

  render() {
    const { confirmLoading } = this.state;
    const { title, fields, visible } = this.props;
    return (
      <div>
        <Modal
          title={title}
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          {fields.map(f => {
            if (f.type === "input-text") {
              return (
                <>
                  <label>{f.label}</label>
                  <Input
                    key={f.target}
                    value={f.value}
                    onChange={event =>
                      this.props.onChangeCallback(f.target, event.target.value)
                    }
                    placeholder={f.label}
                  />
                </>
              );
            } else if (f.type === "date") {
              return (
                <>
                  <label>{f.label}</label><br/>
                  <DatePicker
                    key={f.target}
                    placeholder={f.label}
                    value={f.value}
                    onChange={moment =>
                      this.props.onChangeCallback(f.target, moment)
                    }
                    format="YYYY/MM/DD"
                  />
                </>
              );
            }
          })}
        </Modal>
      </div>
    );
  }
}

export default ModalComponent;
