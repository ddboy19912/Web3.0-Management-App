import React, { useContext } from 'react';
import { MemberRoleContext } from '../context/MemberRoleContext';
import { Box } from '@chakra-ui/react';

const Loader = () => {
  const { greenAlert } = useContext(MemberRoleContext);

  return (
    <div
      className={`${greenAlert ? 'modal-overlay show-modal' : 'modal-overlay'}`}
    >
      <Box
        background="lightgreen"
        className="modal-container"
        color="black"
        borderRadius="20px"
      >
        <h1>Operation Successful</h1>
      </Box>
    </div>
  );
};

export default Loader;
