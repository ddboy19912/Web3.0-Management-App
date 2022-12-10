import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const MemberRoleContext = React.createContext();

const { ethereum } = window;

const getMemberContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const MemberContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return MemberContract;
};

export const MemberRolesProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState();
  const [roleType, setRoleType] = useState('');
  const [assignRole, setAssignRole] = useState({
    addressTo: '',
    roleType: '',
  });
  const [allRoles, setAllRoles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [roleTypeCount, setRoleTypeCount] = useState(
    localStorage.getItem('roleTypeCount')
  );
  const [validation, setValidation] = useState(true);
  const [memberValidation, setMemberValidation] = useState(true);
  const [isRoleChecked, setIsRoleChecked] = useState(true);
  const [roleAddress, setRoleAdress] = useState('');
  const [memberCount, setMemberCount] = useState(
    localStorage.getItem('memberCount')
  );
  const [members, setMembers] = useState([]);
  const [greenAlert, setGreenAlert] = useState(false);
  const [redAlert, setRedAlert] = useState(false);

  const createRoleType = async (e, roles) => {
    setRoleType(e.target.value);
  };

  const handleRoleAssign = async (e) => {
    const value = e.target.value;
    setAssignRole({
      ...assignRole,
      [e.target.name]: value,
    });
  };

  const handleRoleChange = async (e) => {
    setRoleAdress(e.target.value);
  };

  const isWalletConnected = async () => {
    try {
      if (!ethereum) return alert('Please instalol metamask');

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log('No accounts found');
      }
    } catch (error) {
      console.log(error);
      setRedAlert(true);
      setTimeout(() => {
        setRedAlert(false);
        window.location.reload();
      }, 2000);
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert('Please install MetaMask.');

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      });

      setCurrentAccount(accounts[0]);
      //   window.location.reload();
    } catch (error) {
      console.log(error);
      setRedAlert(true);
      setTimeout(() => {
        setRedAlert(false);
        // window.location.reload();
      }, 2000);
      throw new Error('No ethereum object');
    }
  };

  const sendRole = async () => {
    try {
      if (!currentAccount) {
        alert('Please install MetaMask');
        return;
      }
      const MemberContract = getMemberContract();

      const { addressTo, roleType } = assignRole;

      console.log(roles.indexOf(roleType));

      const transactionHash = await MemberContract.addRole(
        addressTo,
        roles.indexOf(roleType)
      );

      setIsLoading(true);
      console.log(`Loading - ${transactionHash.hash}`);
      await transactionHash.wait();
      setIsLoading(false);
      console.log(`Success - ${transactionHash.hash}`);
      setGreenAlert(true);
      setTimeout(() => {
        setGreenAlert(false);
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
      setRedAlert(true);
      setTimeout(() => {
        setRedAlert(false);
        window.location.reload();
      }, 2000);

      throw new Error('No ethereum object');
    }
  };

  const roleArr = async () => {
    const promises = [];

    for (let x = 0; x < roleTypeCount; x++) {
      const MemberContract = getMemberContract();
      const val = MemberContract.roleTypes(x);
      promises.push(val);
    }
    const results = await Promise.all(promises);
    const actualDatas = results.map((result) => result);
    setRoles(actualDatas);
  };

  const membersArr = async () => {
    const promises = [];

    for (let x = 0; x < memberCount; x++) {
      const MemberContract = getMemberContract();
      const val = MemberContract.addresses(x);
      promises.push(val);
    }
    const results = await Promise.all(promises);
    const actualDatas = results.map((result) => result);
    setMembers(actualDatas);
  };

  const sendRoleType = async () => {
    try {
      if (!currentAccount) {
        alert('Please install MetaMask');
        return;
      }

      const MemberContract = getMemberContract();

      const transactionHash = await MemberContract.addRoleType(roleType);

      setIsLoading(true);
      console.log(`Loading - ${transactionHash.hash}`);
      await transactionHash.wait();
      setIsLoading(false);
      setAllRoles((current) => [...current, roleType]);
      console.log(`Success - ${transactionHash.hash}`);
      setGreenAlert(true);
      const roleCount = await MemberContract.roleTypesCount();
      setRoleTypeCount(roleCount.toNumber());
      setTimeout(() => {
        setGreenAlert(false);
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
      setRedAlert(true);
      setTimeout(() => {
        setRedAlert(false);
        window.location.reload();
      }, 2000);
      throw new Error('No ethereum object');
    }
  };

  const getMembers = async () => {
    const MemberContract = getMemberContract();
    const memberCount = await MemberContract.membersCount();
    setMemberCount(memberCount.toNumber());
    window.localStorage.setItem('memberCount', memberCount.toNumber());
  };

  const getRolesCount = async () => {
    try {
      if (!ethereum) {
        alert('Please install MetaMask');
        return;
      }
      const MemberContract = getMemberContract();
      const roleCount = await MemberContract.roleTypesCount();
      window.localStorage.setItem('roleTypeCount', roleCount);
    } catch (error) {
      console.log(error);
      throw new Error('No ethereum object');
    }
  };

  useEffect(() => {
    isWalletConnected();
    getRolesCount();
    getMembers();

    if (members.includes(roleAddress)) setMemberValidation(true);
    else {
      setMemberValidation(false);
    }

    if (!ethers.utils.isAddress(assignRole.addressTo)) setValidation(false);
    else {
      setValidation(true);
    }
    // eslint-disable-next-line
  }, [roleTypeCount, assignRole, roles, roleAddress]);

  const changeRoleStatus = async () => {
    try {
      if (!currentAccount) {
        alert('Please install MetaMask');
        return;
      }

      const MemberContract = getMemberContract();

      const changeStatus = await MemberContract.changeRoleStatus(
        roleAddress,
        isRoleChecked
      );
      console.log(changeStatus);
      setIsLoading(true);
      console.log(`Loading - ${changeStatus.hash}`);
      await changeStatus.wait();
      setIsLoading(false);
      console.log(`Success - ${changeStatus.hash}`);
      setGreenAlert(true);
      setTimeout(() => {
        setGreenAlert(false);
        window.location.reload();
      }, 2000);
    } catch (err) {
      setRedAlert(true);
      setTimeout(() => {
        setRedAlert(false);
        window.location.reload();
      }, 2000);
    }
  };

  return (
    <MemberRoleContext.Provider
      value={{
        connectWallet,
        currentAccount,
        roleTypeCount,
        roleType,
        createRoleType,
        sendRole,
        sendRoleType,
        assignRole,
        handleRoleAssign,
        allRoles,
        validation,
        setValidation,
        setRoleType,
        roleArr,
        roles,
        isLoading,
        handleRoleChange,
        roleAddress,
        memberCount,
        membersArr,
        members,
        memberValidation,
        changeRoleStatus,
        isRoleChecked,
        setIsRoleChecked,
        greenAlert,
        redAlert,
      }}
    >
      {children}
    </MemberRoleContext.Provider>
  );
};
