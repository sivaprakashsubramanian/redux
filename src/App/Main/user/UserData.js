import React, { useState } from 'react'
import {useSelector,useDispatch } from 'react-redux';
import { AgGridReact } from "ag-grid-react";
import { Button, Modal } from "antd";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { addUserData,UpdateUserData,DeleteUserData } from '../../store/reducer/users';
const UserData = () => {
    const UserList=useSelector((state)=>state.name.UserData)
    // console.log({UserList},"snfkjsdf")
    const [checkId,setCheckId]=useState();
    // const [stdDetailArr,setstdDetailArr]=useState([...UserList]);
    const [modalOpen,setModalOpen]=useState(
      {
        isModalOpen:false,
        updateModal:false
      }
    )
    const dispatch=useDispatch();
    const [stdDetail,setStdDetail]=useState({
      id:'',
        name:'',
        email:'',
        father_name:'',
        mother_name:'',
        address:'',
        degree:'',
        college:''

    })
  console.log(UserList,"kkj")
    const [columnDefs]=useState([
      {field:"id"},
        {field:"name"},
        {field:"email"},
        {field:"father_name"},
        {field:"mother_name"},
        {field:"address"},
        {field:"degree"},
        {field:"college"},
        {field:"batch"},
        {field:"Edit",cellRenderer:({data})=>{
          return(
            <div><Button type='primary' onClick={()=>{updatedataOpen();setCheckId(data.id);editDisplay1(data)}}>Edit</Button></div>
          )
        }},
        {field:"Delete",cellRenderer:({data})=>{
          return(
            <div><Button  type='primary' onClick={()=>{delShowModel(data.id)}}>Delete</Button></div>
          )
        }}
    ])
    const showModal = () => {
      setModalOpen({isModalOpen:true});
      setStdDetail({
        id: "",
        name: "",
        email: "",
        father_name: "",
        mother_name: "",
        address: "",
        degree:"",
        college:"",
        batch:""
      });
    };
    
    const handleOk = () => {
      setModalOpen({isModalOpen:false});
    };
    const handleCancel = () => {
      setModalOpen({isModalOpen:false});
    };
    const updatedataOpen = () => {
      setModalOpen({updateModal:true});
    };
    const updateDataOk = () => {
      setModalOpen({updateModal:false});
    };
    const updateDataCancel = () => {
      setModalOpen({updateModal:false});
    };
    // DELETE MODAL
    const delShowModel=(i)=> {
      setModalOpen({DeleteModal:true});
      setCheckId(i);
  
      // deleteDisplay(i);
      console.log(i, "index is");
    }
    const handleDelOk = () => {
      setModalOpen({DeleteModal:false});
    };
    const handleDelCancel = () => {
      setModalOpen({DeleteModal:false});
    };
    const prdInfo = (e) => {
      const { name, value } = e.target;
      setStdDetail((p) => ({
        ...p,
        [name]: value,
      }));
    };
    function prdDisplay() {

      const idvalue = getID();
      // const detail = [...UserList];
     const detail={
        name: stdDetail.name ? stdDetail.name : "null",
        email: stdDetail.email ? stdDetail.email : "null",
        id: idvalue ? idvalue : "null",
        father_name: stdDetail.father_name ? stdDetail.father_name : "null",
        mother_name: stdDetail.mother_name ? stdDetail.mother_name : "null",
        address: stdDetail.address ? stdDetail.address : "null",
        degree: stdDetail.degree ? stdDetail.degree : "null",
        college:stdDetail.college ? stdDetail.college : "null",
        batch:stdDetail.batch ? stdDetail.batch : "null",
      };
      // setstdDetailArr([...detail]);
    dispatch(addUserData(detail));
      
      setStdDetail({
        id: "",
        name: "",
        email: "",
        father_name: "",
        mother_name: "",
        degree:"",
        address: "",
        college:"",
        batch:""
        
      });
    }
    const getID = () => {
      const maxID = UserList.reduce(
        (max, user) => (user.id > max ? user.id : max),
        0
      );
      return maxID + 1;
    };
    
    const checkData=(check)=>{
      const EditData={
        name: stdDetail.name,
          email: stdDetail.email,
          father_name: stdDetail.father_name,
          mother_name: stdDetail.mother_name,
          degree:stdDetail.degree,
          address: stdDetail.address,
          college:stdDetail.college,
          batch:stdDetail.batch,
          id:check
      };
      dispatch(UpdateUserData(EditData))
      }
    function editDisplay1(row) {
      console.log(row,"siva ")
      console.log("viqwertyui");
      const t = row;
      setStdDetail({
        name: t.name,
        email: t.email,
        father_name: t.father_name,
        mother_name: t.mother_name,
        degree: t.degree,
        address:t.address,
        college:t.college,
        batch:t.batch
      });
    }
    function deleteDisplay1(i) {
      dispatch(DeleteUserData(i));

    }

  return (
    <div>
       <Button type="primary" onClick={showModal} style={{ float: "left" }}>
        ADD DATA
      </Button>
      <Modal
            open={modalOpen.isModalOpen}
            title="Product Details"
            onOk={() => {
              handleOk();
              prdInfo();
            }}
            onCancel={handleCancel}
            footer={[
              <Button key="back" onClick={handleCancel}>
                Cancel
              </Button>,

              <Button
                key="submit"
                type="primary"
                onClick={() => {
                  handleOk();
                  prdDisplay();
                }}
                disabled={
                  // !productDetail.id ||
                  !stdDetail.name ||
                  !stdDetail.email ||
                  !stdDetail.father_name||
                  !stdDetail.mother_name||
                  !stdDetail.address||
                  !stdDetail.degree

                }
              >
                Add Detail
              </Button>,
            ]}
          >
            {/* <label style={{ fontWeight: "bold", fontSize: "25px" }}>
              ID
            </label>
            <br />
            <input name="brand" value={productDetail.id} onChange={prdInfo} /> */}
            <br />
            <label style={{ fontWeight: "bold", fontSize: "25px" }}>
              Name
            </label>
            <br />
            <input
              name="name"
              value={stdDetail.name}
              onChange={prdInfo}
              class="border border-black"
            />
            <br />
            <label style={{ fontWeight: "bold", fontSize: "25px" }}>
              Email
            </label>
            <br />
            <input name="email" onChange={prdInfo} value={stdDetail.email} class="border border-black"/>
            <br />

            <label style={{ fontWeight: "bold", fontSize: "25px" }}>
              FatherName
            </label>
            <br />

            <input name="father_name" value={stdDetail.father_name} onChange={prdInfo} class="border border-black"/>
            <br />
            <label style={{ fontWeight: "bold", fontSize: "25px" }}>
              MotherName
            </label>
            <br />
            <input name="mother_name" value={stdDetail.mother_name} onChange={prdInfo}class="border border-black" /><br/>
            <label style={{ fontWeight: "bold", fontSize: "25px" }}>
              Address
            </label>
            <br />
            <input name="address" value={stdDetail.address} onChange={prdInfo} class="border border-black"/><br></br>
            <label style={{ fontWeight: "bold", fontSize: "25px" }}>
              Degree
            </label>
            <br />
            <input name="degree" value={stdDetail.degree} onChange={prdInfo} class="border border-black" /><br></br>
            <label style={{ fontWeight: "bold", fontSize: "25px" }}>
              Collage
            </label>
            <br />
            <input name="college" value={stdDetail.college} onChange={prdInfo} class="border border-black" /><br></br>
            <label style={{ fontWeight: "bold", fontSize: "25px" }}>
              Batch
            </label>
            <br />
            <input name="batch" value={stdDetail.batch} onChange={prdInfo} class="border border-black"/>
          </Modal>
          <Modal
            open={modalOpen.updateModal}
            title="Product Details"
            onOk={() => {
              updateDataOk();
            }}
            onCancel={updateDataCancel}
            footer={[
              <Button key="back" onClick={updateDataCancel}>
                Cancel
              </Button>,

              <Button
                key="submit"
                type="primary"
                onClick={() => {
                  updateDataOk();
                  checkData(checkId);
                  
                }}
                // disabled={!stdDetail.brand || !stdDetail.category || !stdDetail.price || !stdDetail.rating || !stdDetail.img}
              >
                Update Details
              </Button>,
            ]}
          >
            <label style={{ fontWeight: "bold", fontSize: "25px" }}>
              Name
            </label>
            <br />
            <input name="name" value={stdDetail.name} onChange={prdInfo} class="border border-black"/>
            <br />
            <label style={{ fontWeight: "bold", fontSize: "25px" }}>
              Email
            </label>
            <br />
            <input
              name="email"
              value={stdDetail.email}
              onChange={prdInfo}
              class="border border-black"
            />
            <br />
            <label style={{ fontWeight: "bold", fontSize: "25px" }}>
              FatherName
            </label>
            <br />
            <input name="father_name" onChange={prdInfo} value={stdDetail.father_name} class="border border-black"/>
            <br />
            <label style={{ fontWeight: "bold", fontSize: "25px" }}>
              MotherName
            </label>
            <br />

            <input name="mother_name" value={stdDetail.mother_name} onChange={prdInfo} class="border border-black" />
            <br />
            <label style={{ fontWeight: "bold", fontSize: "25px" }}>
              Address
            </label>
            <br />
            <input name="address" value={stdDetail.address} onChange={prdInfo} class="border border-black" /><br/>
            <label style={{ fontWeight: "bold", fontSize: "25px" }}>
              Degree
            </label>
            <br />
            <input name="degree" value={stdDetail.degree} onChange={prdInfo} class="border border-black"/><br></br>
            <label style={{ fontWeight: "bold", fontSize: "25px" }}>
              Collage
            </label>
            <br />
            <input name="college" value={stdDetail.college} onChange={prdInfo} class="border border-black"/><br></br>
            <label style={{ fontWeight: "bold", fontSize: "25px" }}>
              Batch
            </label>
            <br />
            <input name="batch" value={stdDetail.batch} onChange={prdInfo}class="border border-black" />
            
          </Modal> 
          <Modal
            title="Delete Function"
            open={modalOpen.DeleteModal}
            onOk={() => {
              handleDelOk();
              deleteDisplay1(checkId);
            }}
            onCancel={handleDelCancel}
          >
            Delete this function
          </Modal>
        <div className="ag-theme-alpine" style={{ height: "600px", width:"100%" }}>
        <AgGridReact rowData={UserList} columnDefs={columnDefs}></AgGridReact>
        </div>
      
        
      
      </div>
  )
}

export default UserData;