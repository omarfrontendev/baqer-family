// import { toast } from "react-toastify";

const uploadFile = async (body) => {
    const formdata = new FormData();
    formdata.append("category_type", body?.category_type);
    formdata.append("category_id", body.category_id);
    body?.images?.forEach((file) => {
    if (typeof file === "object") {
        formdata.append("image[]", file);
    }
    });
    const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
    };
    // const timeout = setTimeout(() => {
    //     toast.info("يرجى الانتظار حتى الانتهاء من تحميل صورتك");
    // }, 200);
    await fetch(
      `https://fasterlink.me/api/uploadMultipleImage`,
      requestOptions
    );
    // clearTimeout(timeout);
};

export default uploadFile;
