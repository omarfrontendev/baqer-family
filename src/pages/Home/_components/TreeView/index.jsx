import React, { useContext, useEffect, useState } from "react";
import Tree from "react-d3-tree";
import { renderForeignObjectNode } from "./_components/renderForeignObjectNode";
import { useApi } from "../../../../hooks/useApi";
import { Loading, MainButton } from "../../../../components";
import { ModalContext } from "../../../../context/ModalContext";
import UpdateForm from './_components/UpdateForm';
import { FaExclamation } from "react-icons/fa6";
import styles from './.module.scss';
import InfoModal from "./_components/InfoModal";
import DetailsModal from "./_components/DetailsModal";

const MyTree = () => {
  const initialTreeData = {
    id: 1,
    name: "بافر احمد",
    photo: "https://fasterlink.me/uploads/Client/1721777545Rectangle 39.png",
    type: "1",
    marry_type: "0",
    follower_to: "0",
    is_alive: "1",
    is_divorced: "2",
    user_id: "25",
    is_relict: "2",
    deleted: "0",
    created_at: "2024-06-14T14:52:52.000000Z",
    updated_at: "2024-07-23T23:32:26.000000Z",
    // _collapsed: true,
    children: [
      {
        id: 2,
        name: "خطيب بافر",
        photo: null,
        type: "1",
        marry_type: "0",
        follower_to: "1",
        is_alive: "1",
        is_divorced: "1",
        user_id: "25",
        is_relict: "1",
        deleted: "0",
        created_at: "2024-06-14T14:53:44.000000Z",
        updated_at: "2024-07-23T23:10:37.000000Z",
        _collapsed: true,
        children: [
          {
            id: 6,
            name: "احمد خطيب",
            photo: null,
            type: "1",
            marry_type: "0",
            follower_to: "2",
            is_alive: "1",
            is_divorced: "1",
            user_id: "3",
            is_relict: "1",
            deleted: "0",
            created_at: "2024-06-14T15:10:33.000000Z",
            updated_at: "2024-06-14T15:10:33.000000Z",
            children: [],
            marry: [],
          },
          {
            id: 7,
            name: "محمد",
            photo: null,
            type: "1",
            marry_type: "0",
            follower_to: "2",
            is_alive: "1",
            is_divorced: "1",
            user_id: "25",
            is_relict: "1",
            deleted: "0",
            created_at: "2024-06-14T15:11:28.000000Z",
            updated_at: "2024-07-23T23:19:37.000000Z",
            _collapsed: true,
            children: [
              {
                id: 96,
                name: "mmmmm",
                photo: null,
                type: "1",
                marry_type: "0",
                follower_to: "7",
                is_alive: "1",
                is_divorced: "2",
                user_id: "25",
                is_relict: "2",
                deleted: "0",
                created_at: "2024-07-23T23:30:41.000000Z",
                updated_at: "2024-07-23T23:30:41.000000Z",
                children: [],
                marry: [],
              },
            ],
            marry: [],
          },
          {
            id: 92,
            name: "new",
            photo: null,
            type: "1",
            marry_type: "0",
            follower_to: "2",
            is_alive: "2",
            is_divorced: "2",
            user_id: "25",
            is_relict: "2",
            deleted: "0",
            created_at: "2024-07-23T19:47:27.000000Z",
            updated_at: "2024-07-23T19:47:27.000000Z",
            children: [],
            marry: [],
          },
        ],
        marry: [
          {
            id: 4,
            name: "زوجه خطيب بافر",
            photo: null,
            type: "2",
            marry_type: "2",
            follower_to: "2",
            is_alive: "1",
            is_divorced: "1",
            user_id: "3",
            is_relict: "1",
            deleted: "0",
            created_at: "2024-06-14T14:57:40.000000Z",
            updated_at: "2024-06-14T14:57:40.000000Z",
          },
        ],
      },
      {
        id: 67,
        name: "فاطمه خطيب 2",
        photo: null,
        type: "2",
        marry_type: "0",
        follower_to: "1",
        is_alive: "1",
        is_divorced: "1",
        user_id: "35",
        is_relict: "1",
        deleted: "0",
        created_at: "2024-07-22T21:39:04.000000Z",
        updated_at: "2024-07-22T21:39:04.000000Z",
        children: [
          {
            id: 74,
            name: "فاطمه تست 4",
            photo: null,
            type: "2",
            marry_type: "0",
            follower_to: "67",
            is_alive: "1",
            is_divorced: "1",
            user_id: "35",
            is_relict: "1",
            deleted: "0",
            created_at: "2024-07-22T23:11:42.000000Z",
            updated_at: "2024-07-22T23:11:42.000000Z",
            children: [
              {
                id: 66,
                name: "فاطمه خطيب 2",
                photo: null,
                type: "2",
                marry_type: "0",
                follower_to: "74",
                is_alive: "1",
                is_divorced: "1",
                user_id: "25",
                is_relict: "1",
                deleted: "0",
                created_at: "2024-07-22T21:38:48.000000Z",
                updated_at: "2024-07-23T23:15:57.000000Z",
                children: [],
                marry: [],
              },
            ],
            marry: [],
          },
        ],
        marry: [],
      },
      {
        id: 98,
        name: "nnnnn",
        photo: null,
        type: "1",
        marry_type: "0",
        follower_to: "1",
        is_alive: "1",
        is_divorced: "1",
        user_id: "25",
        is_relict: "1",
        deleted: "0",
        created_at: "2024-07-23T23:31:49.000000Z",
        updated_at: "2024-07-23T23:31:49.000000Z",
        children: [],
        marry: [],
      },
    ],
  };

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
    if (initialTreeData)
      return (
        <>
          <div
            style={{ width: "100vw", height: "100vh" }}
            className="container"
          >
            <div className={styles.header}>
              <MainButton
                type="link"
                to="/family-tree/add"
                style={{ margin: "10px 0 0 auto", width: "fit-content" }}
              >
                الإضافة إلى شجرة العائلة
              </MainButton>
              <button
                className={styles.treeInfo}
                onClick={() => setIdModal("show__info__modal")}
              >
                <FaExclamation />
              </button>
            </div>
            <Tree
              // data={tree?.data}
              data={initialTreeData}
              pathFunc="step"
              // onNodeClick={toggleNode}
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
                  onShowDetails: (e) => {
                    setCurrentNode(e);
                    setIdModal(`show__details__${e?.id}`);
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
          {console.log("currentNode", currentNode)}
          {idModal === `show__info__modal` && <InfoModal />}
          {idModal === `show__details__${currentNode?.id}` && (
            <DetailsModal details={currentNode} />
          )}
        </>
      );
};

export default MyTree;
