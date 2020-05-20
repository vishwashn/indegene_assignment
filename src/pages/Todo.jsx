import React, { Component } from "react";
import { Tabs, Button, Table } from "antd";
import ModalComponent from "../components/Modal";
import { connect } from "react-redux";
import {
  deleteUser,
  deleteTodo,
  createUser,
  addTodo
} from "../store/actions/todo";
import moment from 'moment';

const { TabPane } = Tabs;

const dateFormat = "YYYY/MM/DD"

class Todo extends Component {
  state = {
    activePage: "todo",
    visibleUser: false,
    visibleTodo: false,
    values: {}
  };
  callback = key => {
    this.setState({ activePage: key });
  };
  modalCallback = () => {
    this.setState({ visibleUser: false, visibleTodo: false });
  };
  onChangeCallback = (target, val) => {
    const { values } = this.state;
    this.setState({
      values: { ...values, [target]: val }
    });
  };
  handleOk = () => {
    const { values, activePage } = this.state;
    let postValue = {
      ...values,
      id: values.id ? values.id : Math.floor(Math.random() * 10000)
    };
    if (activePage === "todo") {
      this.props.addTodo(postValue);
    } else {
      this.props.createUser(postValue);
    }
    this.setState({ values: {} });
  };
  userColumns = [
    {
      title: "User Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Action",
      key: "id",
      dataIndex: "id",
      render: id => (
        <>
          <a
            onClick={() =>
              this.setState({
                values: this.props.users.filter(u => u.id === id)[0]
              }, () => this.setState({visibleUser: true}))
            }
          >
            Edit
          </a>{" "}
          | <a onClick={() => this.props.deleteUser(id)}>Delete</a>
        </>
      )
    }
  ];
  todoColumns = [
    {
      title: "Action",
      dataIndex: "action",
      key: "action"
    },
    {
      title: "Added Date",
      dataIndex: "addedOn",
      key: "addedOn",
      render: addedOn => moment(addedOn).format(dateFormat).toString()
    },
    {
      title: "Action",
      key: "id",
      dataIndex: "id",
      render: id => (
        <>
          <a
            onClick={() =>
              this.setState({
                values: this.props.todos.filter(t => t.id === id)[0]
              }, () => this.setState({visibleTodo: true}))
            }
          >
            Edit
          </a>{" "}
          | <a onClick={() => this.props.deleteTodo(id)}>Delete</a>
        </>
      )
    }
  ];
  render() {
    const { visibleUser, visibleTodo, values } = this.state;
    const { users, todos } = this.props;
    return (
      <div className="todo-container">
        <h2>Todos Users</h2>
        <Tabs defaultActiveKey="todo" onChange={this.callback}>
          <TabPane tab="Todos" key="todo">
            <Button
              type="primary"
              onClick={() => this.setState({ visibleTodo: true, values: {} })}
            >
              Add Todo
            </Button>
            <ModalComponent
              fields={[
                {
                  label: "Action",
                  target: "action",
                  value: values.action,
                  type: "input-text"
                },
                {
                  label: "Date Added",
                  target: "addedOn",
                  value: values.addedOn,
                  type: "date"
                }
              ]}
              title="Add Todo"
              visible={visibleTodo}
              modalCallback={this.modalCallback}
              onChangeCallback={this.onChangeCallback}
              handleOk={this.handleOk}
            />
            <Table columns={this.todoColumns} dataSource={todos} />
          </TabPane>
          <TabPane tab="Users" key="user">
            <Button
              type="primary"
              onClick={() => this.setState({ visibleUser: true, values: {} })}
            >
              Create User
            </Button>
            <ModalComponent
              fields={[
                {
                  label: "Name",
                  target: "name",
                  value: values.name,
                  type: "input-text"
                },
                {
                  label: "Email",
                  target: "email",
                  value: values.email,
                  type: "input-text"
                }
              ]}
              title="Add new user"
              visible={visibleUser}
              modalCallback={this.modalCallback}
              onChangeCallback={this.onChangeCallback}
              handleOk={this.handleOk}
            />
            <Table columns={this.userColumns} dataSource={users} />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.todo.users,
    todos: state.todo.todos
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createUser: values => dispatch(createUser(values)),
    addTodo: values => dispatch(addTodo(values)),
    deleteUser: values => dispatch(deleteUser(values)),
    deleteTodo: values => dispatch(deleteTodo(values)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
