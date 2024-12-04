import React, { useEffect, useState } from 'react';
import { Table, Button, Space, message, Modal, Input, Form, Select } from 'antd';
import axios from 'axios';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isAdding, setIsAdding] = useState(false); 
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: '',
    status: '',
  });
  const [loading, setLoading] = useState(false);

  const jwt = localStorage.getItem('jwt');

  // Fetch tasks from backend
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8081/api/tasks/getAllTasks', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      setTasks(response.data);
      message.success('Tasks fetched successfully!');
    } catch (error) {
      message.error('Failed to fetch tasks!');
    } finally {
      setLoading(false);
    }
  };

  // Remove a task
  const removeTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8081/api/tasks/deleteById/${taskId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      message.success('Task removed successfully!');
      fetchTasks();
    } catch (error) {
      message.error('Failed to remove task!');
    }
  };

  // Save edited task details
  const saveTask = async () => {
    try {
      await axios.put(`http://localhost:8081/api/tasks/updateTasksById/${editingTask.taskId}`, editingTask, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });
      message.success('Task updated successfully!');
      setIsEditing(false);
      fetchTasks();
    } catch (error) {
      message.error('Failed to update task!');
    }
  };

  // Add new task
  const addTask = async () => {
    try {
      await axios.post('http://localhost:8081/api/tasks/saveNewTask', newTask, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
      });
      message.success('Task added successfully!');
      setIsAdding(false);
      fetchTasks();
      setNewTask({ title: '', description: '', dueDate: '', priority: '', status: '' }); 
    } catch (error) {
      message.error('Failed to add task!');
    }
  };

  // Handle input changes for editing
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingTask({ ...editingTask, [name]: value });
  };

  // Handle input changes for adding
  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setNewTask({ ...newTask, [name]: value });
  };

  // Handle changes for priority and status (Select fields)
  const handleSelectChange = (name, value, isAddingMode = false) => {
    if (isAddingMode) {
      setNewTask({ ...newTask, [name]: value });
    } else {
      setEditingTask({ ...editingTask, [name]: value });
    }
  };

  // Open edit modal
  const openEditModal = (task) => {
    setEditingTask(task);
    setIsEditing(true);
  };

  // Open add modal
  const openAddModal = () => {
    setIsAdding(true);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Table columns
  const columns = [
    {
      title: 'Task ID',
      dataIndex: 'taskId',
      key: 'taskId',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => openEditModal(record)}>
            Edit
          </Button>
          <Button type="danger" onClick={() => removeTask(record.taskId)}>
            Remove
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2
          style={{
            color: '#333',
            fontSize: '2rem',
            fontWeight: 'bold',
            backgroundColor: '#f0f0f0',
            padding: '10px',
            marginTop: '20px',
          }}
        >
          Task List
        </h2>
        <Button type="primary" onClick={openAddModal}>
          Add Task
        </Button>
      </div>

      <Table
        dataSource={tasks}
        columns={columns}
        rowKey="taskId"
        loading={loading}
        pagination={{ pageSize: 5 }}
        rowClassName="task-list-row"
      />

      {/* Modal for Editing Task */}
      <Modal
        title="Edit Task"
        visible={isEditing}
        onCancel={() => setIsEditing(false)}
        onOk={saveTask}
        okText="Save"
      >
        {editingTask && (
          <Form layout="vertical">
            <Form.Item label="Title">
              <Input
                placeholder="Title"
                name="title"
                value={editingTask.title || ''}
                onChange={handleEditChange}
              />
            </Form.Item>
            <Form.Item label="Description">
              <Input
                placeholder="Description"
                name="description"
                value={editingTask.description || ''}
                onChange={handleEditChange}
              />
            </Form.Item>
            <Form.Item label="Due Date">
              <Input
                placeholder="Due Date"
                name="dueDate"
                value={editingTask.dueDate || ''}
                onChange={handleEditChange}
                type="date"
              />
            </Form.Item>
            <Form.Item label="Priority">
              <Select
                value={editingTask.priority || ''}
                onChange={(value) => handleSelectChange('priority', value)}
                options={[
                  { value: 'Low', label: 'Low' },
                  { value: 'Medium', label: 'Medium' },
                  { value: 'High', label: 'High' },
                ]}
              />
            </Form.Item>
            <Form.Item label="Status">
              <Select
                value={editingTask.status || ''}
                onChange={(value) => handleSelectChange('status', value)}
                options={[
                  { value: 'Pending', label: 'Pending' },
                  { value: 'In Progress', label: 'In Progress' },
                  { value: 'Completed', label: 'Completed' },
                ]}
              />
            </Form.Item>
          </Form>
        )}
      </Modal>

      {/* Modal for Adding Task */}
      <Modal
        title="Add Task"
        visible={isAdding}
        onCancel={() => setIsAdding(false)}
        onOk={addTask}
        okText="Add"
      >
        <Form layout="vertical">
          <Form.Item label="Title">
            <Input
              placeholder="Title"
              name="title"
              value={newTask.title}
              onChange={handleAddChange}
            />
          </Form.Item>
          <Form.Item label="Description">
            <Input
              placeholder="Description"
              name="description"
              value={newTask.description}
              onChange={handleAddChange}
            />
          </Form.Item>
          <Form.Item label="Due Date">
            <Input
              placeholder="Due Date"
              name="dueDate"
              value={newTask.dueDate}
              onChange={handleAddChange}
              type="date"
            />
          </Form.Item>
          <Form.Item label="Priority">
            <Select
              value={newTask.priority}
              onChange={(value) => handleSelectChange('priority', value, true)}
              options={[
                { value: 'Low', label: 'Low' },
                { value: 'Medium', label: 'Medium' },
                { value: 'High', label: 'High' },
              ]}
            />
          </Form.Item>
          <Form.Item label="Status">
            <Select
              value={newTask.status}
              onChange={(value) => handleSelectChange('status', value, true)}
              options={[
                { value: 'Pending', label: 'Pending' },
                { value: 'In Progress', label: 'In Progress' },
                { value: 'Completed', label: 'Completed' },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
