import React from "react";
import { Image } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
const Navbar = () => {
  const location = useLocation().pathname;
  console.log(location);
  return (
    <>
      {location == "/" ? null : (
        <div className="">
          <Image src="assets/gambar.png" height={"100%"} width={"100%"} />
        </div>
      )}
    </>
  );
};

export default Navbar;
