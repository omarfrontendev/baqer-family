import React, { useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import { ModalContext } from "../../context/ModalContext";
import OccasionsModal from "../../pages/Home/_components/OccasionsModal";

export function AuthGuard() {
  const token = Cookies.get("token");
  return token ? <Navigate to="/" /> : <Outlet />;
}

export function PagesGuard() {
  const token = Cookies.get("token");
  const { setIdModal, idModal } = useContext(ModalContext);

  // get latest occasions:=
  const { onRequest: onGetOccasions, data: occasionsRes } = useApi(
    "/api/viewOccasionPopUp",
    "get"
  );

  useEffect(() => {
    onGetOccasions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (occasionsRes?.success) {
      setIdModal("occasions-modal");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [occasionsRes?.success]);

  return !token ? (
    <Navigate to="/login" />
  ) : (
    <>
      {idModal === "occasions-modal" && occasionsRes?.data?.length ? (
        <OccasionsModal occasions={occasionsRes?.data} />
      ) : ""}
      <Outlet />
    </>
  );
}
