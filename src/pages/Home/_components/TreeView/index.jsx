import React, { useContext, useEffect, useState } from "react";
import Tree from "react-d3-tree";
import { renderForeignObjectNode } from "./_components/renderForeignObjectNode";
import { useApi } from "../../../../hooks/useApi";
import { Loading, MainButton } from "../../../../components";
import { ModalContext } from "../../../../context/ModalContext";
import UpdateForm from './_components/UpdateForm';

const MyTree = () => {

  const [deleting, setDeleing] = useState(false);
  const [currentNode, setCurrentNode] = useState(null)
  const { idModal, setIdModal } = useContext(ModalContext);

  // get news
  const {
    data: tree,
    loading,
    onRequest: onGetTree,
  } = useApi(`api/viewTree`, "get");

  useEffect(() => {
    onGetTree();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { onRequest: onDelete, loading: isDeleting } = useApi(
    `/api/deleteTreeBranch`,
    "post"
  );

  const onDeleteBranch = async (id) => {
    setDeleing(id);
    try {
      const res = await onDelete({
        branch_id: id,
      });
      res?.success && onGetTree();
      setDeleing(null);
    } catch (err) {
      console.log(err);
      setDeleing(null);
    }
    setDeleing(null);
  };
  

  if (loading) return (
    <div style={{ height: "100vh", width: "100vw", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Loading />
    </div>
  );
    if (tree?.data)
      return (
        <>
          <div
            style={{ width: "100vw", height: "100vh" }}
            className="container"
          >
            <MainButton
              type="link"
              to="/family-tree/add"
              style={{ margin: "10px 0 0 auto", width: "fit-content" }}
            >
              الإضافة إلى شجرة العائلة
            </MainButton>
            <Tree
              data={tree?.data}
              pathFunc="elbow"
              translate={{ x: 630, y: 100 }}
              renderCustomNodeElement={(rd3tProps) =>
                renderForeignObjectNode({
                  ...rd3tProps,
                  toggleNode: rd3tProps.toggleNode,
                  onDelete: onDeleteBranch,
                  onUpdate: (e) => {
                    setCurrentNode(e);
                    setIdModal(`update__branch__${e?.id}`);
                  },
                  isDeleting,
                  deleting,
                })
              }
              // allowForeignObjects={true}
              orientation="vertical"
            />
          </div>
          {idModal === `update__branch__${currentNode?.id}` && (
            <UpdateForm branch={currentNode} onGetTree={onGetTree} />
          )}
        </>
      );
};

export default MyTree;
