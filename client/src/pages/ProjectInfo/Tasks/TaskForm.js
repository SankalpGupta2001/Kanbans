import { Button, Form, Input, message, Modal, Tabs, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CreateTask, UpdateTask, UploadImage } from "../../../apicalls/tasks";
import { SetLoading } from "../../../redux/loadersSlice";

function TaskForm({
  showTaskForm,
  setShowTaskForm,
  project,
  task,
  reloadData,
}) {
  const [selectedTab = "1", setSelectedTab] = React.useState("1");
  const [email, setEmail] = React.useState("");
  const { user } = useSelector((state) => state.users);
  const formRef = React.useRef(null);
  const [file = null, setFile] = React.useState(null);
  const [images = [], setImages] = React.useState(task?.attachments || []);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      let response = null;
      // const assignedToMember = project.members.find(
      //   (member) => member.user.email === email
      // );
      // const assignedToUserId = assignedToMember.user._id;
      dispatch(SetLoading(true));
      if (task) {
        // update task
        response = await UpdateTask({
          ...values,
          project: project._id,
          _id: task._id,
        });
      } else {
        const assignedBy = user._id;
        response = await CreateTask({
          ...values,
          project: project._id,
        });
      }

      if (response.success) {
        // if (!task) {
        //   // send notification to the assigned employee
        //   AddNotification({
        //     title: `You have been assigned a new task in ${project.name}`,
        //     user: assignedToUserId,
        //     onClick: `/project/${project._id}`,
        //     description: values.description,
        //   });
        // }

        reloadData();
        message.success(response.message);
        setShowTaskForm(false);
      }
      dispatch(SetLoading(false));
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  // const validateEmail = () => {
  //   const employeesInProject = project.members.filter(
  //     (member) => member.role === "employee"
  //   );
  //   const isEmailValid = employeesInProject.find(
  //     (employee) => employee.user.email === email
  //   );
  //   return isEmailValid ? true : false;
  // };

  // const uploadImage = async () => {
  //   try {
  //     dispatch(SetLoading(true));
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     formData.append("taskId", task._id);
  //     const response = await UploadImage(formData);
  //     if (response.success) {
  //       message.success(response.message);
  //       setImages([...images, response.data]);
  //       reloadData();
  //     } else {
  //       throw new Error(response.message);
  //     }
  //     dispatch(SetLoading(false));
  //   } catch (error) {
  //     dispatch(SetLoading(false));
  //     message.error(error.message);
  //   }
  // };

  // const deleteImage = async (image) => {
  //   try {
  //     dispatch(SetLoading(true));
  //     const attachments = images.filter((img) => img !== image);
  //     const response = await UpdateTask({
  //       ...task,
  //       attachments,
  //     });
  //     if (response.success) {
  //       message.success(response.message);
  //       setImages(attachments);
  //       reloadData();
  //     } else {
  //       throw new Error(response.message);
  //     }
  //     dispatch(SetLoading(false));
  //   } catch (error) {
  //     message.error(error.message);
  //     dispatch(SetLoading(false));
  //   }
  // };

  return (
    <Modal
      title={task ? "UPDATE TASK" : "CREATE TASK"}
      open={showTaskForm}
      onCancel={() => setShowTaskForm(false)}
      centered
      onOk={() => {
        formRef.current.submit();
      }}
      okText={task ? "UPDATE" : "CREATE"}
      width={800}
      {...(selectedTab === "2" && { footer: null })}
    >
      <Tabs activeKey={selectedTab} onChange={(key) => setSelectedTab(key)}>
        <Tabs.TabPane tab="Task Details" key="1">
          <Form
            layout="vertical"
            ref={formRef}
            onFinish={onFinish}
            initialValues={{
              ...task,
             
            }}
          >
            <Form.Item label="Task Name" name="name">
              <Input />
            </Form.Item>

            <Form.Item label="Task Description" name="description">
              <TextArea />
            </Form.Item>

            

            
          </Form>
        </Tabs.TabPane>
      </Tabs>
    </Modal>
  );
}

export default TaskForm;
