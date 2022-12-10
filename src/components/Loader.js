import React, { useContext } from 'react';
import { MemberRoleContext } from '../context/MemberRoleContext';
import loader from '../assets/Tetrahedral Loader.gif';
import { Image } from '@chakra-ui/react';

const Loader = () => {
  const { isLoading } = useContext(MemberRoleContext);
  return (
    <div
      className={`${isLoading ? 'modal-overlay show-modal' : 'modal-overlay'}`}
    >
      <div className="modal-container">
        <Image src={loader} alt="" width="20%" />
      </div>
    </div>
  );
};

export default Loader;
