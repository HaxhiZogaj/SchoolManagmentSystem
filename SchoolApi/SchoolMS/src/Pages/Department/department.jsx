import { useEffect, useState } from 'react';
import GenericGrid from '../../Common/GenericGrid/genericGrid';
import NotificationBanner from '../../Common/NotificationBanner/notificationBanner';
import { addDepartment, deleteDepartment, getAllDepartments, updateDepartment } from '../../Services/DepartmentApi';
import './department.css';


function DepartmentGrid() {
  const [departments, setDepartments] = useState([]);
  const [ready, setReady] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });


  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await getAllDepartments();
        setDepartments(res.data);
        setReady(true);
      } catch (error) {
        console.error('Gabim gjatë ngarkimit të departamenteve:', error);
        showNotification("Gabim gjatë ngarkimit!", "error");
      }
    };
    fetchDepartments();
  }, [refresh]);

    const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  const columns = [
    {   field: 'departmentId',  headerText: 'ID', isPrimaryKey: true, isIdentity: true, visible: false, width: 100 },
    { field: 'departmentName', headerText: 'Emri Departamentit', validationRules: { required: true }, width: 250 },
    { field: 'description', headerText: 'Përshkrimi', editType: 'multilineedit', width: 300 }
  ];

  const handleActionBegin = async (args) => {
    if (args.requestType === 'save') {
      try {
        const payload = {
          DepartmentId: args.data.departmentId || 0,
          DepartmentName: args.data.departmentName,
          Description: args.data.description
        };

        if (args.data.departmentId) {
          await updateDepartment(args.data.departmentId, payload);
         showNotification("Departamenti u përditësua me sukses!", "success");
        } else {
          await addDepartment(payload);
          showNotification("Departamenti u shtua me sukses!", "success");
        }
        setRefresh((prev) => !prev);
      } catch (error) {
        console.error('Gabim gjatë ruajtjes:', error);
        showNotification("Gabim gjatë ruajtjes!", "error");
      }
    }

    if (args.requestType === 'delete') {
      try {
        const id = args.data[0]?.departmentId;
        if (id) {
          await deleteDepartment(id);
          showNotification("Departamenti u fshi me sukses!", "success");
          setRefresh((prev) => !prev);
          showNotification("Gabim gjatë fshirjes!", "error");
        }
      } catch (error) {
        console.error('Gabim gjatë fshirjes:', error);
      }
    }
  };

  return (
      <>
          <NotificationBanner message={notification.message} type={notification.type} />
    <GenericGrid title="Menaxhimi i Departamenteve" data={departments} columns={columns} dataReady={ready} actionBegin={handleActionBegin} 
    dropdownOptions={[
        { text: 'Switch to Dialog', id: 'Dialog' },
        { text: 'Switch to Inline', id: 'Inline' }
      ]}
    />
     </>
  );
}

export default DepartmentGrid;