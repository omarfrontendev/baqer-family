// import { toast } from "react-toastify";

const UploadFamilyImages = async (body) => {
  const formdata = new FormData();
  formdata.append("user_id[]", body.user_id);
  body?.images?.forEach((file) => {
    if (typeof file === "object") {
      formdata.append("photo[]", file);
    }
  });
  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };
  await fetch(
    `https://fasterlink.me/api/treeUserImages?image[]&user_id[]`,
    requestOptions
  );
  // clearTimeout(timeout);
};

export default UploadFamilyImages;
