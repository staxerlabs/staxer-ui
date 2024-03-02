import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  useAccount,
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
  useNetwork
} from "wagmi";
import contractAbi from "../resources/contracts/polygon-mumbai/0x84127AEd5a3b1FbC1fc5D6BaC8B59355CCACB5F3.json";
import contractAbiERC20 from "../resources/contracts/polygon-mumbai/0xD1C27D5B46c54DB4e2c4f6DA2eAa97dC26945462.json";
import { Button, Anchor, Flex } from '@mantine/core';
import { Page } from '../Page'
import './Onboard.css'

const description = `Enjoy the new way for witholding the tax while earning interests on your witholding`
const PasswordErrorMessage = () => { 
  return ( 
    <p className="FieldError">Password should have at least 8 characters</p> 
  ); 
 }; 

export function Onboard() {
  const { address } = useAccount();
  const { chain } = useNetwork()
  const [location, setLocation] = useState(""); 
  const [spending, setSpending] = useState(""); 
  const [trade, setTrade] = useState(""); 
  const [donate, setDonate] = useState(""); 
  const [income, setIncome] = useState(""); 
  const [waddress, setWAddress] = useState(""); 
    
  const handleSubmit = (e: { preventDefault: () => void; }) => { 
    e.preventDefault(); 
    alert("Account created!"); 
  }; 

  const [balanceChanging, setBalanceChanging] = useState(false)


  const { config } = usePrepareContractWrite({
    address: "0x84127AEd5a3b1FbC1fc5D6BaC8B59355CCACB5F3",
    abi: contractAbi,
    functionName: "deployContract",
    args: ["test",0,[waddress],income,[spending],[trade],"USDT",["0xD1C27D5B46c54DB4e2c4f6DA2eAa97dC26945462"],true],
  });
  const { write: mint } = useContractWrite(config);

  const { data: balance = 0, refetch } = useContractRead({
    address: "0xD1C27D5B46c54DB4e2c4f6DA2eAa97dC26945462",
    abi: contractAbiERC20,
    functionName: "balanceOf",
    args: [address],
  });

  useEffect(() => {
    if (balance) {
      setBalanceChanging(false)
    }
  }, [balance])

  const interval = useRef<any>()

  const handleClick = useCallback(() => {
    if (mint) {
      setBalanceChanging(true)
      mint()
      interval.current = setInterval(() => {
        refetch()
      }, 1000)
      setTimeout(() => {
        if (interval.current) {
          clearInterval(interval.current)
        }
      }, 100000)
    }
  }, [mint, refetch])

  useEffect(() => {
    if (interval.current) {
      clearInterval(interval.current)
    }
  }, [balance, interval]);

  return (
    <Page title={"Onboard"} description={description}>
      <Flex align={'center'} justify={'center'} direction={'column'} gap={'1rem'} style={{ flex: 1 }}>
      <div className="App"> 
     <form onSubmit={handleSubmit}> 
         <div className="Field"> 
           <label> 
             Location <sup>*</sup> 
           </label> 
           <input 
             value={location} 
             onChange={(e) => { 
               setLocation(e.target.value); 
             }} 
             placeholder="location" 
           /> 
         </div> 
         <div className="Field"> 
           <label> 
             Withholding <sup>*</sup> 
           </label> 
           <input 
             value={trade} 
             onChange={(e) => { 
               setTrade(e.target.value); 
             }} 
             placeholder="Trade%" 
           /> 
             <input 
             value={income} 
             onChange={(e) => { 
               setIncome(e.target.value); 
             }} 
             placeholder="Income%" 
           /> 
               <input 
             value={donate} 
             onChange={(e) => { 
               setDonate(e.target.value); 
             }} 
             placeholder="Donation%" 
           /> 
          <br/>
          <input 
             value={waddress} 
             onChange={(e) => { 
               setWAddress(e.target.value); 
             }} 
             placeholder="Withholding Address" 
           /> 

         </div> 

         <div className="Field"> 
           <label> 
             Spending Address <sup>*</sup> 
           </label> 
           <input 
             value={spending} 
             onChange={(e) => { 
               setSpending(e.target.value); 
             }} 
             placeholder="spending" 
           /> 
         </div> 
         <Button
          loading={balanceChanging}
          size={'sm'}
          onClick={handleClick}
        >
          Create Safe
        </Button>
     </form> 
   </div> 
      </Flex>
    </Page>
  );
}
