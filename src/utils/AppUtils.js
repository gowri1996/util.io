const successToastMessage = (data) => {
  return { position: "top", status: "success", duration: 2000, ...data };
};

const errorToastMessage = (data) => {
  return { position: "top", status: "error", duration: 2000, ...data };
};

const exportData = {
  successToastMessage,
  errorToastMessage,
};

export default exportData;
