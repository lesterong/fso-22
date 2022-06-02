const Notification = ({ notif }) => {
  const { message, type='success' } = notif
  return (
    <>
      {message && 
        <div className={type}> 
          {message}
        </div>
      }
    </>
  );
};

export default Notification
