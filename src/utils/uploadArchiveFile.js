import Cookies from "js-cookie";

const uploadArchiveFile = async (body) => {
  const formdata = new FormData();
  const  token = Cookies.get("token");
  formdata.append("type", `${body.type}`);
  formdata.append("archive_id", body.archive_id);
  formdata.append("Authorization", `Bearer ${token}`);
  if (body?.type === 1 || body?.type === 2) {
    formdata.append("file", body.file);
  } else if (body?.type === 3) {
    formdata.append("url", `${body.url}`);
  }
  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };
  await fetch(
    `https://fasterlink.me/public/api/addArchiveFile`,
    requestOptions
  );
  // clearTimeout(timeout);
};

export default uploadArchiveFile;
