const deleteImage = async (id) => {
  const formdata = new FormData();
  formdata.append("image_id", id);
// formdata.append("category_type", "diwan");
  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };
  const res = await fetch(`https://fasterlink.me/api/deleteCategoryImage`, requestOptions);
  const data = await res.text();
  return JSON.parse(data);
};

export default deleteImage ;
