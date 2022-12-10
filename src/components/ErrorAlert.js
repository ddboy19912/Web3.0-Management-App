import React, { useContext } from 'react';
import { MemberRoleContext } from '../context/MemberRoleContext';
import { Box } from '@chakra-ui/react';

const Loader = () => {
  const { redAlert } = useContext(MemberRoleContext);

  return (
    <div
      className={`${redAlert ? 'modal-overlay show-modal' : 'modal-overlay'}`}
    >
      <Box
        background="lightcoral"
        className="modal-container"
        color="black"
        borderRadius="20px"
      >
        <h1>Operation Unsuccessful</h1>
      </Box>
    </div>
  );
};

export default Loader;
