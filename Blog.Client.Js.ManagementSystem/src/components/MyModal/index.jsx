import {Flex, Modal} from "antd";
import TextArea from "antd/es/input/TextArea.js";
import { useSelector} from "react-redux";

import PropTypes from 'prop-types';

function MyModal({handleOk, handleCancel, children}){
  const onOpen = useSelector(state => state.componentReducers.modal.onOpen)

  return (
    <>
      <Modal title="Publish An Article" open={onOpen} onOk={handleOk} onCancel={handleCancel} >
        {children}
      </Modal>
    </>
  )
}

MyModal.propTypes = {
  handleOk: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  children: PropTypes.node
}

export default MyModal