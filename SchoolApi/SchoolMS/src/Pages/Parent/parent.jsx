import { useEffect, useState } from 'react';
import GenericGrid from '../../Common/GenericGrid/genericGrid';
import NotificationBanner from '../../Common/NotificationBanner/notificationBanner';
import { addParent, deleteParent, getAllParents, getUserDropdown, updateParent } from '../../Services/ParentApi';
import './parent.css';


function ParentGrid() {
  const [parents, setParents] = useState([]);
  const [users, setUsers] = useState([]);
  const [ready, setReady] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });


  useEffect(() => {
    async function fetchData() {
      try {
        const [parentsRes, usersRes] = await Promise.all([ getAllParents(),   getUserDropdown()  ]);
        setParents(parentsRes.data); setUsers(usersRes.data);  setReady(true);
      } catch (error) {
        console.error('Gabim gjatë ngarkimit të prindërve ose përdoruesve:', error);
        showNotification("Gabim gjatë ngarkimit!", "error");
      }
    }
    fetchData();
  }, [refresh]);


   const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  const columns = [
    {  field: 'parentId',  headerText: 'ID',  isPrimaryKey: true, isIdentity: true,  visible: false,  width: 100 },
    {  field: 'userId', headerText: 'Përdoruesit',  foreignKeyField: 'userId',  foreignKeyValue: 'username', dataSource: users, validationRules: { required: true },  width: 180  },
    {  field: 'firstName',   headerText: 'Emri', validationRules: { required: true },  width: 150},
    { field: 'lastName', headerText: 'Mbiemri', validationRules: { required: true },  width: 150  },
    { field: 'email', headerText: 'Email',   validationRules: { required: true, email: true }, width: 200 },
    {  field: 'phoneNumber',  headerText: 'Numri TEL',  width: 150 },
    { field: 'address',  headerText: 'Adresa',  width: 250 }
  ];

  const handleActionBegin = async (args) => {
    if (args.requestType === 'save') {
      try {
        const parentData = {
          ParentId: args.data.parentId,
          UserId: Number(args.data.userId),
          FirstName: args.data.firstName,
          LastName: args.data.lastName,
          Email: args.data.email,
          PhoneNumber: args.data.phoneNumber,
          Address: args.data.address
        };

        if (args.data.parentId) {
          await updateParent(args.data.parentId, parentData);
          showNotification("Prindi u përditësua me sukses!", "success");
        } else {
          await addParent(parentData);
          showNotification("Prindi u shtua me sukses!", "success");
        }

        setRefresh(prev => !prev);
      } catch (error) {
        console.error('Gabim gjatë ruajtjes së prindit:', error);
        showNotification("Gabim gjatë ruajtjes!", "error");
      }
    }

    if (args.requestType === 'delete') {
      try {
        const id = args.data[0]?.parentId;
        if (id) {
          await deleteParent(id);
          showNotification("Prindi u fshi me sukses!", "success");
          setRefresh(prev => !prev);
        }
      } catch (error) {
        console.error('Gabim gjatë fshirjes së prindit:', error);
        showNotification("Gabim gjatë fshirjes!", "error");
      }
    }
  };

  return (
    <>
      <NotificationBanner message={notification.message} type={notification.type} />
    <GenericGrid  title="Menaxhimi i Prindërve"  data={parents}  columns={columns}  dataReady={ready} actionBegin={handleActionBegin}
      dropdownOptions={[
        { text: 'Switch to Dialog', id: 'Dialog' },
        { text: 'Switch to Inline', id: 'Inline' }
      ]}
    />
    </>
  );
}

export default ParentGrid;